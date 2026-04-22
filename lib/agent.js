import Anthropic from '@anthropic-ai/sdk';
import { getLeadById, getMessages, saveMessage, updateLead, logAction } from './db.js';
import { sendSMS } from './twilio.js';
import { sendEmail } from './email.js';
import { getCalendlyLink } from './calendly.js';
import { updateGHLContact } from './ghl.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const QUALIFY_THRESHOLD = 3; // questions before making a booking push

function buildSystemPrompt(config, lead) {
  const personality = {
    professional: 'You are professional, concise, and results-focused.',
    friendly: 'You are warm, conversational, and relatable — like a helpful friend.',
    direct: 'You are direct and confident. You cut to the chase without small talk.',
    custom: config.custom_personality || 'You are professional and helpful.',
  }[config.personality || 'professional'];

  return `You are ${config.agent_name || 'Alex'}, an AI assistant for ${config.business_name}.
${personality}

Your job:
1. Respond naturally to this lead's messages
2. Ask qualifying questions ONE at a time to determine if they're a good fit
3. Once they're clearly interested and qualified, send them the booking link
4. Keep SMS messages under 160 characters when possible
5. Never be pushy or salesy — be genuinely helpful

Qualification criteria for ${config.business_name}:
${config.qualification_criteria || 'Ask about their current situation, their biggest challenge, their timeline, and their budget.'}

Calendly booking link: ${config.calendly_link || '[calendly link not configured]'}

Current lead info:
- Name: ${lead.name || 'Unknown'}
- Channel: ${lead.channel}
- Status: ${lead.status}
- Messages exchanged: ${lead.message_count || 0}

Rules:
- If they ask to stop or say they're not interested, respect it immediately
- If they're clearly qualified and want to book, give them the Calendly link
- Sign off as ${config.agent_name || 'Alex'} from ${config.business_name}
- Never reveal you are an AI unless directly asked; if asked, be honest`;
}

export async function runAgent({ leadId, inboundMessage, channel, clientConfig }) {
  const lead = await getLeadById(leadId);
  if (!lead) throw new Error(`Lead ${leadId} not found`);

  if (!clientConfig.agent_enabled) return null;

  await saveMessage({ leadId, role: 'lead', content: inboundMessage, channel });

  const history = await getMessages(leadId);
  const messages = history.map(m => ({
    role: m.role === 'lead' ? 'user' : 'assistant',
    content: m.content,
  }));

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: [
      {
        type: 'text',
        text: buildSystemPrompt(clientConfig, lead),
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages,
  });

  const reply = response.content[0].text.trim();

  await saveMessage({ leadId, role: 'agent', content: reply, channel });

  const actions = [];

  const isBooking =
    reply.toLowerCase().includes('calendly') ||
    reply.toLowerCase().includes('book') ||
    reply.toLowerCase().includes('schedule') ||
    (clientConfig.calendly_link && reply.includes(clientConfig.calendly_link));

  if (isBooking && lead.status !== 'booked') {
    await updateLead(leadId, { status: 'booking' });
    actions.push({ type: 'booking_link_sent', description: `Sent booking link to ${lead.name || 'lead'}` });
    await logAction({
      clientId: clientConfig.id,
      leadId,
      type: 'booking_link_sent',
      description: `Sent Calendly link to ${lead.name || lead.phone || lead.email}`,
    });
  }

  const qualifyingCount = history.filter(m => m.role === 'agent').length;
  if (qualifyingCount >= QUALIFY_THRESHOLD && lead.status === 'qualifying') {
    await updateLead(leadId, { status: 'qualified' });
    await logAction({
      clientId: clientConfig.id,
      leadId,
      type: 'lead_qualified',
      description: `${lead.name || 'Lead'} qualified after ${qualifyingCount} exchanges`,
    });
  }

  if (lead.status === 'new') {
    await updateLead(leadId, { status: 'qualifying' });
  }

  if (channel === 'sms' && clientConfig.twilio_phone) {
    await sendSMS({ to: lead.phone, from: clientConfig.twilio_phone, body: reply });
    await logAction({
      clientId: clientConfig.id,
      leadId,
      type: 'sms_sent',
      description: `SMS sent to ${lead.phone}: "${reply.slice(0, 60)}${reply.length > 60 ? '…' : ''}"`,
    });
  } else if (channel === 'email' && lead.email) {
    await sendEmail({
      to: lead.email,
      subject: `Re: ${clientConfig.business_name}`,
      text: reply,
      from: `${clientConfig.agent_name || 'Alex'} <noreply@${process.env.NEXT_PUBLIC_BASE_URL?.replace('https://', '') || 'setterbot.ai'}>`,
    });
    await logAction({
      clientId: clientConfig.id,
      leadId,
      type: 'email_sent',
      description: `Email sent to ${lead.email}`,
    });
  }

  if (clientConfig.ghl_api_key) {
    await updateGHLContact({
      apiKey: clientConfig.ghl_api_key,
      locationId: clientConfig.ghl_location_id,
      lead,
      status: lead.status,
      lastMessage: reply,
    }).catch(() => {});
  }

  return { reply, actions };
}

export async function qualifyLead(lead, clientConfig) {
  const prompt = `Based on this conversation, rate this lead's qualification from 1-10 and explain why in one sentence.
Business: ${clientConfig.business_name}
Criteria: ${clientConfig.qualification_criteria || 'interest level, budget, timeline'}
Lead messages: ${lead.messages?.filter(m => m.role === 'lead').map(m => m.content).join(' | ')}
Respond with JSON: { "score": number, "reason": "string", "qualified": boolean }`;

  try {
    const res = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });
    return JSON.parse(res.content[0].text);
  } catch {
    return { score: 5, reason: 'Could not assess', qualified: false };
  }
}
