import { parseTwilioWebhook, twilioSignatureValid } from '@/lib/twilio';
import { findOrCreateLead, getClientByPhone } from '@/lib/db';
import { runAgent } from '@/lib/agent';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const params = Object.fromEntries(formData.entries());

    const sig = req.headers.get('x-twilio-signature') || '';
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio`;

    if (!twilioSignatureValid(sig, url, params, process.env.TWILIO_AUTH_TOKEN)) {
      return new Response('Forbidden', { status: 403 });
    }

    const { from, to, message, channel } = parseTwilioWebhook(params);

    const client = await getClientByPhone(to.replace('whatsapp:', ''));
    if (!client) return new Response('', { status: 200 });

    if (!client.agent_enabled) return new Response('', { status: 200 });

    const lead = await findOrCreateLead({
      clientId: client.id,
      phone: from.replace('whatsapp:', ''),
      channel,
    });

    await runAgent({
      leadId: lead.id,
      inboundMessage: message,
      channel,
      clientConfig: client,
    });

    return new Response('', { status: 200 });
  } catch (err) {
    console.error('[twilio webhook]', err);
    return new Response('', { status: 200 });
  }
}
