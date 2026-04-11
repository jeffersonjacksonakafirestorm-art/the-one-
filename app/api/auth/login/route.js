import { getBusinessByEmail } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + process.env.AUTH_SECRET || 'crai-secret').digest('hex');
}

function makeToken(id) {
  return Buffer.from(`${id}:${Date.now()}`).toString('base64');
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const business = await getBusinessByEmail(email.toLowerCase().trim());
    if (!business) {
      return Response.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const hash = hashPassword(password);
    if (hash !== business.password_hash) {
      return Response.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = makeToken(business.id);

    const user = {
      id: business.id,
      business_name: business.business_name,
      owner_name: business.owner_name,
      email: business.email,
      industry: business.industry,
      plan: business.plan,
      twilio_number: business.twilio_number,
    };

    return Response.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
