import { NextResponse } from 'next/server';
import { getFreeTiralResponse } from '@/lib/ai';
import { hasUsedFreeTrial, recordFreeTrial } from '@/lib/db';

export async function POST(req) {
  try {
    const { scenario, imageBase64, imageMediaType } = await req.json();
    if (!scenario?.trim()) return NextResponse.json({ error: 'Scenario is required.' }, { status: 400 });

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';

    const used = await hasUsedFreeTrial(ip);
    if (used) return NextResponse.json({ error: 'Free trial already used.' }, { status: 429 });

    const response = await getFreeTiralResponse(scenario.trim(), imageBase64 || null, imageMediaType || null);
    await recordFreeTrial(ip);

    return NextResponse.json({ response });
  } catch (err) {
    console.error('free-trial error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
