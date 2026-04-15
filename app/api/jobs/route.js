import { createJob, getJobsByBusiness, updateJob, getBusinessById } from '@/lib/db';
import { sendQuoteEmail, sendInvoiceEmail, sendBookingConfirmation } from '@/lib/email';
import { draftQuote, draftInvoice } from '@/lib/ai';
import { logEmail } from '@/lib/db';

function getBusinessId(request) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [id] = decoded.split(':');
    return id;
  } catch { return token; }
}

export async function GET(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const jobs = await getJobsByBusiness(businessId);
  return Response.json({ jobs });
}

export async function POST(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const { customer_id, customer_name, customer_email, service, price, notes } = body;

  const job = await createJob({
    business_id: businessId,
    customer_id,
    customer_name,
    customer_email,
    service,
    price: parseFloat(price) || 0,
    notes,
    status: 'new',
  });

  return Response.json({ job }, { status: 201 });
}

export async function PATCH(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, status, ...rest } = body;
  if (!id) return Response.json({ error: 'Job ID required' }, { status: 400 });

  const business = await getBusinessById(businessId);
  const prefs = business?.ai_preferences || null;
  const approveBeforeSend = business?.approve_before_send !== false;
  const signature = business?.email_signature || '';

  const updated = await updateJob(id, { status, ...rest });

  // Trigger automations on status change
  if (status === 'quoted' && updated.customer_email) {
    const draft = await draftQuote(business?.business_name || 'Us', updated.customer_name, updated.service, updated.price, prefs);
    const result = await sendQuoteEmail({
      to: updated.customer_email,
      businessName: business?.business_name,
      customerName: updated.customer_name,
      service: updated.service,
      price: updated.price,
      jobId: id,
      customerId: updated.customer_id,
      signature,
      approveBeforeSend,
      subject: draft.subject,
      body: draft.body,
    });
    if (result?.pending) {
      await logEmail({ business_id: businessId, job_id: id, customer_id: updated.customer_id, to: updated.customer_email, subject: result.subject, html: result.html, type: 'quote', status: 'pending' });
    }
    await updateJob(id, { quote_sent_at: new Date().toISOString() });
  }

  if (status === 'booked' && updated.customer_email) {
    await sendBookingConfirmation({
      to: updated.customer_email,
      businessName: business?.business_name,
      customerName: updated.customer_name,
      service: updated.service,
      customerId: updated.customer_id,
      signature,
    });
  }

  if (status === 'complete' && updated.customer_email) {
    const draft = await draftInvoice(business?.business_name, updated.customer_name, updated.service, updated.price, prefs);
    const result = await sendInvoiceEmail({
      to: updated.customer_email,
      businessName: business?.business_name,
      customerName: updated.customer_name,
      service: updated.service,
      price: updated.price,
      jobId: id,
      customerId: updated.customer_id,
      signature,
      approveBeforeSend,
      subject: draft.subject,
      body: draft.body,
    });
    if (result?.pending) {
      await logEmail({ business_id: businessId, job_id: id, customer_id: updated.customer_id, to: updated.customer_email, subject: result.subject, html: result.html, type: 'invoice', status: 'pending' });
    }
    await updateJob(id, {
      invoice_sent_at: new Date().toISOString(),
      reactivation_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }

  return Response.json({ job: updated });
}
