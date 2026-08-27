const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const apiBase = (process.argv[2] || process.env.PRODUCTION_API_BASE || 'https://jplanet-backend.vercel.app/api').replace(/\/$/, '');
const testMessage = 'this is a testing mail from developer and kazi marketing group side';

async function post(path, body) {
  const response = await fetch(`${apiBase}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://www.jplanettire.com',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success === false) {
    throw new Error(`${path} failed: ${response.status} ${JSON.stringify(result)}`);
  }

  return result;
}

async function cleanup(ids) {
  if (!process.env.DATABASE_URL) return;

  await mongoose.connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 15000 });
  const objectIds = ids.filter(Boolean).map((id) => new mongoose.Types.ObjectId(id));

  if (objectIds.length) {
    await mongoose.connection.db.collection('contacts').deleteMany({ _id: { $in: objectIds } });
    await mongoose.connection.db.collection('bookings').deleteMany({ _id: { $in: objectIds } });
  }

  await mongoose.disconnect();
}

async function main() {
  const contact = await post('/contact/submit', {
    fullName: 'Production API Test Contact',
    enquiryType: 'Production notification test',
    company: 'Kazi Marketing Group',
    email: process.env.MAIL_USER || 'developer@example.com',
    phone: '+440000000000',
    country: 'United Kingdom',
    message: testMessage,
    consentMarketing: false,
  });

  const booking = await post('/bookings/submit', {
    tireId: 'production-test-tire-id',
    tireName: 'Production API Test Tire',
    items: [{ size: '315/80R22.5', quantity: 2, sizeId: 'production-test-size-id' }],
    fullName: 'Production API Test Booking',
    company: 'Kazi Marketing Group',
    email: process.env.MAIL_USER || 'developer@example.com',
    phone: '+440000000000',
    country: 'United Kingdom',
    role: 'Developer QA',
    notes: testMessage,
  });

  const contactId = contact?.data?.id;
  const bookingId = booking?.data?.id;
  await cleanup([contactId, bookingId]);

  console.log(`PRODUCTION_CONTACT_OK id=${contactId} emailFailed=${Boolean(contact?.data?.emailFailed)}`);
  console.log(`PRODUCTION_BOOKING_OK id=${bookingId} emailFailed=${Boolean(booking?.data?.emailFailed)}`);
  console.log('PRODUCTION_TEST_RECORDS_CLEANED');
}

main().catch(async (err) => {
  try {
    await mongoose.disconnect();
  } catch {
    // ignore cleanup disconnect failures
  }
  console.error(`PRODUCTION_API_TEST_FAILED ${err.message}`);
  process.exit(1);
});
