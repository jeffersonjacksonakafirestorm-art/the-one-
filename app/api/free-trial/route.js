import { NextResponse } from 'next/server';
import { getFreeTiralResponse } from '@/lib/ai';
import { hasUsedFreeTrial, recordFreeTrial } from '@/lib/db';

// In-memory rate limiting — resets per serverless instance but adds meaningful burst protection
const ipLastHit = new Map();
let globalCount = 0;
let globalWindowStart = Date.now();

function checkRateLimit(ip) {
  const now = Date.now();

  // Reset global window every minute
  if (now - globalWindowStart > 60_000) {
    globalCount = 0;
    globalWindowStart = now;
  }

  // Circuit breaker: max 60 free trial calls per minute globally
  if (globalCount >= 60) return 'global';

  // Per-IP: 5 second cooldown between attempts (DB handles the real one-per-IP check)
  const last = ipLastHit.get(ip) || 0;
  if (now - last < 5_000) return 'ip';

  globalCount++;
  ipLastHit.set(ip, now);
  return null;
}

export async function POST(req) {
  try {
    const { scenario, imageBase64, imageMediaType } = await req.json();
    if (!scenario?.trim()) return NextResponse.json({ error: 'Scenario is required.' }, { status: 400 });

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';

    const limited = checkRateLimit(ip);
    if (limited === 'global') return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
    if (limited === 'ip') return NextResponse.json({ error: 'Please wait a moment before trying again.' }, { status: 429 });

    const used = await hasUsedFreeTrial(ip);
    if (used) return NextResponse.json({ error: 'Free trial already used.' }, { status: 429 });

    // Cap input to 1500 chars server-side regardless of what the client sends
    const safeScenario = scenario.trim().slice(0, 1500);

    const response = await getFreeTiralResponse(safeScenario, imageBase64 || null, imageMediaType || null);
    await recordFreeTrial(ip);

    return NextResponse.json({ response });
  } catch (err) {
    console.error('free-trial error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
