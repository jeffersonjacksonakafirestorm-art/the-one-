import { createCustomer, getCustomersByBusiness, updateCustomer } from '@/lib/db';

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
  const customers = await getCustomersByBusiness(businessId);
  return Response.json({ customers });
}

export async function POST(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const { name, email, phone, address } = body;
  if (!name) return Response.json({ error: 'Name required' }, { status: 400 });
  const customer = await createCustomer({ business_id: businessId, name, email, phone, address });
  return Response.json({ customer }, { status: 201 });
}

export async function PATCH(request) {
  const businessId = getBusinessId(request);
  if (!businessId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, ...data } = await request.json();
  if (!id) return Response.json({ error: 'Customer ID required' }, { status: 400 });
  const customer = await updateCustomer(id, data);
  return Response.json({ customer });
}
