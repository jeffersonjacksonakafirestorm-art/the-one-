const BASE = 'https://api.calendly.com';

async function calendlyFetch(path, apiKey, options = {}) {
  if (!apiKey) return null;
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getSchedulingLink(apiKey, eventTypeUri) {
  if (!apiKey || !eventTypeUri) return null;
  const data = await calendlyFetch('/scheduling_links', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      max_event_count: 1,
      owner: eventTypeUri,
      owner_type: 'EventType',
    }),
  });
  return data?.resource?.booking_url || null;
}

export async function getEventTypes(apiKey) {
  if (!apiKey) return [];
  const me = await calendlyFetch('/users/me', apiKey);
  if (!me) return [];
  const userUri = me.resource.uri;
  const data = await calendlyFetch(`/event_types?user=${encodeURIComponent(userUri)}`, apiKey);
  return data?.collection || [];
}

export async function getCalendlyLink(apiKey, schedulingUrl) {
  if (schedulingUrl) return schedulingUrl;
  const types = await getEventTypes(apiKey);
  return types[0]?.scheduling_url || null;
}

export async function parseCalendlyWebhook(body) {
  const { event, payload } = body;
  return {
    event,
    inviteeName: payload?.invitee?.name,
    inviteeEmail: payload?.invitee?.email,
    startTime: payload?.event?.start_time,
    eventUri: payload?.event?.uri,
    cancelUrl: payload?.invitee?.cancel_url,
  };
}
