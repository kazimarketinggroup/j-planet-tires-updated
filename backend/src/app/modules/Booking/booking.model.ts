import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingItemSchema = new Schema(
  {
    size: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    sizeId: { type: String, trim: true },
  },
  { _id: false },
);

const bookingSchema = new Schema<TBooking>(
  {
    tireId: { type: String, trim: true },
    tireName: { type: String, required: true, trim: true },
    items: {
      type: [bookingItemSchema],
      required: true,
      validate: [(items: unknown[]) => items.length > 0, 'At least one tire size is required'],
    },
    totalQuantity: { type: Number, required: true, min: 1 },
    fullName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    role: { type: String, trim: true },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
