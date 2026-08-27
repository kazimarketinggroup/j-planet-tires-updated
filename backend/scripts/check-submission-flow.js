const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function main() {
  await mongoose.connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 15000 });

  const { ContactServices } = require('../dist/app/modules/Contact/contact.service');
  const { BookingServices } = require('../dist/app/modules/Booking/booking.service');

  const contactResult = await ContactServices.createContactIntoDB({
    fullName: 'J Planet Test Contact',
    enquiryType: 'Notification test',
    company: 'J Planet QA',
    email: process.env.MAIL_USER,
    phone: '+8801000000000',
    country: 'Bangladesh',
    message: 'this is a testing mail from developer and kazi marketing group side',
    consentMarketing: false,
  });

  const bookingResult = await BookingServices.createBookingIntoDB({
    tireId: 'test-tire-id',
    tireName: 'J Planet Test Tire',
    items: [
      {
        size: '315/80R22.5',
        quantity: 2,
        sizeId: 'test-size-id',
      },
    ],
    fullName: 'J Planet Test Booking',
    company: 'J Planet QA',
    email: process.env.MAIL_USER,
    phone: '+8801000000000',
    country: 'Bangladesh',
    role: 'QA',
    notes: 'this is a testing mail from developer and kazi marketing group side',
  });

  await contactResult.contact.deleteOne();
  await bookingResult.booking.deleteOne();
  await mongoose.disconnect();

  console.log(`CONTACT_FLOW_OK emailFailed=${contactResult.emailFailed}`);
  console.log(`BOOKING_FLOW_OK emailFailed=${bookingResult.emailFailed}`);
}

main().catch(async (err) => {
  try {
    await mongoose.disconnect();
  } catch {
    // ignore disconnect errors during failure cleanup
  }
  console.error(`FLOW_TEST_FAILED ${err.message}`);
  process.exit(1);
});
