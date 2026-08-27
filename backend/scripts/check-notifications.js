const dotenv = require('dotenv');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

dotenv.config();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL missing');
  }

  await mongoose.connect(process.env.DATABASE_URL, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db;
  await db.admin().ping();
  console.log(`MONGO_OK ${db.databaseName}`);
  await mongoose.disconnect();

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail',
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT || 587),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.verify();
  console.log('SMTP_VERIFY_OK');

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    replyTo: process.env.MAIL_USER,
    subject: 'J Planet notification test',
    html: '<p>this is a testing mail from developer and kazi marketing group side</p><p>J Planet backend email notification test passed.</p>',
  });

  console.log(`MAIL_SENT ${info.messageId}`);
  console.log(`ACCEPTED ${info.accepted.join(',')}`);
}

main().catch((err) => {
  console.error(`TEST_FAILED ${err.message}`);
  process.exit(1);
});
