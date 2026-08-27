import { model, Schema } from 'mongoose';
import { TContact } from './contact.interface';

const contactSchema = new Schema<TContact>(
  {
    fullName: { type: String, required: true, trim: true },
    enquiryType: { type: String, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    message: { type: String, trim: true },
    consentMarketing: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Contact = model<TContact>('Contact', contactSchema);
