const BASE = 'https://rest.gohighlevel.com/v1';

async function ghlFetch(path, apiKey, options = {}) {
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

export async function findOrCreateContact({ apiKey, locationId, lead }) {
  if (!apiKey) return null;

  const search = await ghlFetch(
    `/contacts/?locationId=${locationId}&query=${encodeURIComponent(lead.phone || lead.email || '')}`,
    apiKey
  );

  if (search?.contacts?.length > 0) {
    return search.contacts[0];
  }

  const created = await ghlFetch('/contacts/', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      locationId,
      firstName: lead.name?.split(' ')[0] || '',
      lastName: lead.name?.split(' ').slice(1).join(' ') || '',
      phone: lead.phone || '',
      email: lead.email || '',
      source: 'SetterBot AI',
      tags: ['ai-lead'],
    }),
  });
  return created?.contact || null;
}

export async function updateGHLContact({ apiKey, locationId, lead, status, lastMessage }) {
  if (!apiKey) return null;

  const contact = await findOrCreateContact({ apiKey, locationId, lead });
  if (!contact) return null;

  const statusTagMap = {
    qualified: 'ai-qualified',
    booking: 'ai-booking',
    booked: 'ai-booked',
    unqualified: 'ai-unqualified',
  };

  const tag = statusTagMap[status];
  const updates = {
    customField: [{ id: 'ai_last_message', value: lastMessage?.slice(0, 200) || '' }],
  };
  if (tag) updates.tags = [tag];

  return ghlFetch(`/contacts/${contact.id}`, apiKey, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function addNoteToContact({ apiKey, contactId, note }) {
  if (!apiKey) return null;
  return ghlFetch(`/contacts/${contactId}/notes/`, apiKey, {
    method: 'POST',
    body: JSON.stringify({ body: note }),
  });
}

export async function createGHLOpportunity({ apiKey, locationId, contactId, leadName, pipelineId }) {
  if (!apiKey || !pipelineId) return null;
  return ghlFetch('/opportunities/', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      locationId,
      pipelineId,
      contactId,
      name: `${leadName} — AI Booked`,
      status: 'open',
      source: 'SetterBot AI',
    }),
  });
}
