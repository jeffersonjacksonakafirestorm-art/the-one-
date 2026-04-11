import twilio from 'twilio';
import Anthropic from '@anthropic-ai/sdk';
import { getBusinessByPhone, saveMissedCall, saveConversation } from '@/lib/db';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const incomingMsg = formData.get('Body') || '';
    const from = formData.get('From') || '';
    const to = formData.get('To') || ''; // The CallRecoverAI number (business's assigned number)
    const callStatus = formData.get('CallStatus');

    // Missed call webhook (no Body, just CallStatus)
    if (callStatus && !incomingMsg) {
      if (callStatus === 'no-answer' || callStatus === 'busy' || callStatus === 'failed') {
        await handleMissedCall(from, to);
      }
      return new Response('', { status: 204 });
    }

    // SMS reply from customer
    if (incomingMsg) {
      await handleSmsReply(from, to, incomingMsg);
    }

    return new Response('', { status: 204 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('', { status: 204 }); // Always return 204 to Twilio
  }
}

async function handleMissedCall(callerNumber, twilioNumber) {
  const business = await getBusinessByPhone(twilioNumber);
  const businessName = business?.business_name || 'the business';
  const welcomeMsg = business?.welcome_message
    || `Hey — sorry we missed your call, this is ${businessName}. How can we help?`;

  // Save missed call record
  if (business) {
    await saveMissedCall({
      business_id: business.id,
      caller_number: callerNumber,
      twilio_number: twilioNumber,
      status: 'texted',
    });
  }

  // Send initial text-back
  const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await twilioClient.messages.create({
    body: `${welcomeMsg}\n\nReply STOP to unsubscribe.`,
    from: twilioNumber,
    to: callerNumber,
  });
}

async function handleSmsReply(callerNumber, twilioNumber, incomingMsg) {
  // Handle STOP opt-out
  if (/^\s*(STOP|STOPALL|UNSUBSCRIBE|CANCEL|END|QUIT)\s*$/i.test(incomingMsg)) {
    return; // Twilio handles opt-out automatically
  }

  const business = await getBusinessByPhone(twilioNumber);
  const businessName = business?.business_name || 'the business';
  const industry = business?.industry || 'service business';

  const systemPrompt = `You are an AI assistant for ${businessName}, a ${industry} company.
You are responding to a customer who called and didn't get an answer.
Your job is to be helpful, warm, and professional — qualify the customer's need and try to book a time for service or get their contact info.
Keep replies SHORT — 1-3 sentences max. Sound like a real person, not a robot.
Do not mention you are an AI. Do not use bullet points. Be conversational.
If they want to book, ask for their availability. If they have an emergency, prioritize urgency.
Always end by moving the conversation forward — ask a question or confirm next steps.`;

  const aiResponse = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 160,
    system: systemPrompt,
    messages: [{ role: 'user', content: incomingMsg }],
  });

  const replyText = aiResponse.content[0].text;

  // Save conversation
  if (business) {
    await saveConversation({
      business_id: business.id,
      caller_number: callerNumber,
      messages: [
        { role: 'user', text: incomingMsg, timestamp: new Date().toISOString() },
        { role: 'ai', text: replyText, timestamp: new Date().toISOString() },
      ],
    });
  }

  // Send AI reply
  const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await twilioClient.messages.create({
    body: replyText,
    from: twilioNumber,
    to: callerNumber,
  });
}
