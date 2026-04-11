import { createBusiness, getBusinessByEmail } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + process.env.AUTH_SECRET || 'crai-secret').digest('hex');
}

function makeToken(id) {
  return Buffer.from(`${id}:${Date.now()}`).toString('base64');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { business_name, owner_name, email, password, phone, industry, welcome_message } = body;

    if (!business_name || !email || !password || !phone || !industry) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return Response.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const existing = await getBusinessByEmail(email);
    if (existing) {
      return Response.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const defaultMessage = `Hey — sorry we missed your call, this is ${business_name}. How can we help?`;

    const business = await createBusiness({
      business_name,
      owner_name,
      email: email.toLowerCase().trim(),
      password_hash: hashPassword(password),
      phone: phone.replace(/\D/g, ''),
      industry,
      welcome_message: welcome_message || defaultMessage,
      plan: 'trial',
      trial_started_at: new Date().toISOString(),
      twilio_number: null, // assigned when Twilio is configured
    });

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

    return Response.json({ token, user }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
