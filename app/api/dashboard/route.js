import { getClientById, getLeadsByClient, getRecentActions, getDashboardStats, getMessages } from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const leadId = searchParams.get('leadId');

    if (!clientId) return Response.json({ error: 'clientId required' }, { status: 400 });

    if (leadId) {
      const messages = await getMessages(leadId, 50);
      return Response.json({ messages });
    }

    const [client, leads, actions, stats] = await Promise.all([
      getClientById(clientId),
      getLeadsByClient(clientId, { limit: 50 }),
      getRecentActions(clientId, 50),
      getDashboardStats(clientId),
    ]);

    return Response.json({ client, leads, actions, stats });
  } catch (err) {
    console.error('[dashboard api]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { clientId, agent_enabled } = await req.json();
    const { updateClient } = await import('@/lib/db');
    const updated = await updateClient(clientId, { agent_enabled });
    return Response.json({ ok: true, agent_enabled: updated?.agent_enabled });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
