import { parseCalendlyWebhook } from '@/lib/calendly';
import { getLeadByPhone, updateLead, saveAppointment, logAction, getClientById } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { event, inviteeName, inviteeEmail, startTime, eventUri } = parseCalendlyWebhook(body);

    if (event !== 'invitee.created') {
      return Response.json({ ok: true, skipped: true });
    }

    const clientId = req.nextUrl?.searchParams.get('clientId') || body.clientId;
    if (!clientId) return Response.json({ ok: true });

    const client = await getClientById(clientId);

    const lead = inviteeEmail
      ? await (async () => {
          const { data } = await import('@/lib/db').then(m => ({ data: null }));
          return data;
        })()
      : null;

    if (clientId) {
      await saveAppointment({
        clientId,
        leadId: lead?.id || null,
        calendlyEventId: eventUri,
        meetingTime: startTime,
      });

      await logAction({
        clientId,
        leadId: lead?.id || null,
        type: 'meeting_booked',
        description: `Meeting booked with ${inviteeName || inviteeEmail} for ${new Date(startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`,
        metadata: { startTime, inviteeName, inviteeEmail },
      });

      if (lead) {
        await updateLead(lead.id, { status: 'booked' });
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[calendly webhook]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
