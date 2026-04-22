import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ user: null });
    const { session_token, stripe_customer_id, ...safe } = user;
    return NextResponse.json({ user: { ...safe, stripe_customer_id: !!stripe_customer_id } });
  } catch {
    return NextResponse.json({ user: null });
  }
}
