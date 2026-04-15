import { updateCustomer } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id && id !== 'owner') {
    try {
      await updateCustomer(id, { unsubscribed: true, unsubscribed_at: new Date().toISOString() });
    } catch (err) {
      console.error('Unsubscribe error:', err);
    }
  }

  return new Response(
    `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
      <div style="text-align:center;max-width:400px;padding:40px;">
        <p style="font-size:32px;margin-bottom:16px;">✓</p>
        <h1 style="font-size:22px;font-weight:700;margin-bottom:8px;">Unsubscribed</h1>
        <p style="color:#888;font-size:15px;">You've been removed from this business's automated emails. You won't hear from them through Groundwork again.</p>
      </div>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
