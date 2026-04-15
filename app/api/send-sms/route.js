import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request) {
  const { to, message } = await request.json();

  if (!to || !message) {
    return Response.json({ error: 'Missing "to" or "message"' }, { status: 400 });
  }

  const msg = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });

  return Response.json({ sid: msg.sid });
}
