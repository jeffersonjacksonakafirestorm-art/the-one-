const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function sendSMS({ to, from, body }) {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    console.log('[twilio] not configured — would send to:', to, 'body:', body);
    return { sid: 'dev-' + Date.now() };
  }
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }).toString(),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio error: ${err}`);
  }
  return res.json();
}

export async function sendWhatsApp({ to, from, body }) {
  return sendSMS({
    to: `whatsapp:${to}`,
    from: `whatsapp:${from}`,
    body,
  });
}

export function parseTwilioWebhook(body) {
  return {
    from: body.From,
    to: body.To,
    message: body.Body,
    messageSid: body.MessageSid,
    channel: body.From?.startsWith('whatsapp:') ? 'whatsapp' : 'sms',
  };
}

export function twilioSignatureValid(signature, url, params, authToken) {
  if (!authToken) return true;
  const crypto = require('crypto');
  const sorted = Object.keys(params).sort().reduce((s, k) => s + k + params[k], url);
  const expected = crypto.createHmac('sha1', authToken).update(sorted).digest('base64');
  return signature === expected;
}
