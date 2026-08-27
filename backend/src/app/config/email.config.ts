export { createEmailTransporter } from '../utils/email';

export const emailConfig = {
  from: process.env.MAIL_FROM || process.env.MAIL_USER,
  to: process.env.MAIL_TO || 'info@jplanettire.net',
};
