import AppError from '../../Errors/AppError';
import { formatMultiline, renderEmailShell, renderRows, sendOwnerNotification } from '../../utils/email';
import { TCreateBooking } from './booking.interface';
import { Booking } from './booking.model';

const normalizeQuantity = (value: unknown): number => {
  const quantity = Number(value);
  return Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
};

const generateOwnerEmailTemplate = (data: TCreateBooking & { totalQuantity: number }): string => {
  const rows = renderRows([
    ['Tire', data.tireName],
    ['Total Quantity', data.totalQuantity],
    ['Name', data.fullName],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Country', data.country],
    ['Role', data.role],
  ]);

  const items = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #e5e7eb;">${formatMultiline(item.size)}</td>
          <td style="padding:9px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${item.quantity}</td>
        </tr>`,
    )
    .join('');

  const itemTable = `
    <h2 style="margin:24px 0 8px;font-size:16px;">Requested Sizes</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${items}
    </table>`;

  const notes = data.notes
    ? `<h2 style="margin:24px 0 8px;font-size:16px;">Notes</h2><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;">${formatMultiline(data.notes)}</div>`
    : '';

  return renderEmailShell('New Tire Booking Request', `${rows}${itemTable}${notes}`);
};

const createBookingIntoDB = async (payload: TCreateBooking) => {
  if (!payload.fullName || !payload.email || !payload.tireName) {
    throw new AppError(400, 'Required fields missing');
  }

  const items = (payload.items ?? [])
    .map((item) => ({ ...item, quantity: normalizeQuantity(item.quantity) }))
    .filter((item) => item.size && item.quantity > 0);

  if (!items.length) {
    throw new AppError(400, 'At least one tire size is required');
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const bookingPayload = { ...payload, items, totalQuantity };
  const booking = await Booking.create(bookingPayload);

  let emailFailed = false;
  try {
    const sent = await sendOwnerNotification({
      replyTo: payload.email,
      subject: `New tire booking - ${payload.tireName} - ${payload.fullName}`,
      html: generateOwnerEmailTemplate(bookingPayload),
    });
    emailFailed = !sent;
  } catch {
    emailFailed = true;
  }

  return { booking, emailFailed };
};

const getAllBookingsFromDB = async () => Booking.find().sort({ createdAt: -1 });

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
