const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const MODEL = '@cf/meta/llama-3.1-8b-instruct';

async function run(prompt) {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    // Return a sensible fallback when CF not configured
    return null;
  }
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${CF_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], max_tokens: 400 }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.result?.response || null;
}

function prefsContext(prefs) {
  if (!prefs) return '';
  const parts = [];
  if (prefs.tone) parts.push(`Tone: ${prefs.tone}`);
  if (prefs.commonPhrases?.length) parts.push(`Common phrases the owner uses: ${prefs.commonPhrases.join(', ')}`);
  if (prefs.signature) parts.push(`Signature: ${prefs.signature}`);
  return parts.length ? `\n\nOwner preferences:\n${parts.join('\n')}` : '';
}

export async function draftQuote(businessName, customerName, service, price, prefs) {
  const prompt = `Write a short, professional email from "${businessName}" to "${customerName}" quoting them $${price} for "${service}".
Keep it warm, concise, under 80 words. End with a clear call to action to reply and confirm.
Return only the email body text, no subject line.${prefsContext(prefs)}`;

  const body = await run(prompt);
  return {
    subject: `Your quote from ${businessName}`,
    body: body || `Hi ${customerName},\n\nThanks for reaching out! We'd love to help with your ${service}.\n\nYour quote: $${price}\n\nReply to confirm and we'll get you scheduled right away.\n\n— ${businessName}`,
  };
}

export async function draftFollowUp(businessName, customerName, service, prefs) {
  const prompt = `Write a short follow-up email from "${businessName}" to "${customerName}" who hasn't responded to a quote for "${service}".
Friendly, not pushy, under 60 words. Ask if they're still interested.${prefsContext(prefs)}`;

  const body = await run(prompt);
  return {
    subject: `Following up — ${businessName}`,
    body: body || `Hi ${customerName},\n\nJust following up on the quote we sent for your ${service}. Still interested? We'd love to get you on the schedule.\n\n— ${businessName}`,
  };
}

export async function draftInvoice(businessName, customerName, service, price, prefs) {
  const prompt = `Write a short, friendly invoice email from "${businessName}" to "${customerName}" for completed work on "${service}" totaling $${price}.
Thank them, include the amount clearly, ask them to reply to arrange payment. Under 70 words.${prefsContext(prefs)}`;

  const body = await run(prompt);
  return {
    subject: `Invoice from ${businessName}`,
    body: body || `Hi ${customerName},\n\nThank you for choosing ${businessName}! Your invoice for ${service} is $${price}.\n\nPlease reply to arrange payment — we accept check, Venmo, and Zelle.\n\nWe appreciate your business!\n\n— ${businessName}`,
  };
}

export async function draftReactivation(businessName, customerName, service, monthsAgo, season, prefs) {
  const prompt = `Write a short, friendly reactivation email from "${businessName}" to "${customerName}" who used their ${service} service ${monthsAgo} months ago.
It's currently ${season}. Ask if they need anything or want to schedule a follow-up service. Under 70 words, natural and not salesy.${prefsContext(prefs)}`;

  const body = await run(prompt);
  return {
    subject: `${businessName} — checking in`,
    body: body || `Hi ${customerName},\n\nIt's been ${monthsAgo} months since we completed your ${service} — just checking in to see if you need anything or if it's time for a follow-up.\n\nReply anytime and we'll take care of you.\n\n— ${businessName}`,
  };
}
