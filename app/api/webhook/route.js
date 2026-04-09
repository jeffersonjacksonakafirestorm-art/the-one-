import twilio from 'twilio';
import Anthropic from '@anthropic-ai/sdk';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const formData = await request.formData();
  const incomingMsg = formData.get('Body');
  const from = formData.get('From');

  const aiResponse = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 160,
    messages: [{ role: 'user', content: incomingMsg }],
    system: 'You are a helpful SMS assistant. Reply briefly in 1-2 sentences.',
  });

  const replyText = aiResponse.content[0].text;

  await twilioClient.messages.create({
    body: replyText,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: from,
  });

  return new Response('', { status: 204 });
}
