import { findOrCreateLead, getClientById } from '@/lib/db';
import { runAgent } from '@/lib/agent';

// Generic inbound lead handler — call this from any source
// (form submissions, GHL webhooks, Zapier, etc.)
export async function POST(req) {
  try {
    const { clientId, name, phone, email, message, channel = 'sms', source } = await req.json();

    if (!clientId || !message) {
      return Response.json({ error: 'clientId and message required' }, { status: 400 });
    }

    const clientConfig = await getClientById(clientId);
    if (!clientConfig) return Response.json({ error: 'Client not found' }, { status: 404 });

    if (!clientConfig.agent_enabled) {
      return Response.json({ ok: true, skipped: true, reason: 'agent_disabled' });
    }

    const lead = await findOrCreateLead({ clientId, phone, email, name, channel });

    const result = await runAgent({
      leadId: lead.id,
      inboundMessage: message,
      channel,
      clientConfig,
    });

    return Response.json({ ok: true, leadId: lead.id, reply: result?.reply, actions: result?.actions });
  } catch (err) {
    console.error('[agent/inbound]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
