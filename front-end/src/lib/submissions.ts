// Form submission service shared by the contact form and the tire booking modal.
// The backend owns persistence and Nodemailer notifications.

export interface ContactSubmission {
  enquiryType?: string;
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  consentMarketing?: boolean;
}

export interface BookingItem {
  size: string;
  quantity: number;
  sizeId?: string;
}

export interface BookingSubmission {
  tireId?: string;
  tireName: string;
  items: BookingItem[];
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  role?: string;
  notes?: string;
}

export interface SubmitResult {
  ok: boolean;
  emailFailed?: boolean;
  error?: string;
}

export const isValidEmail = (value: string): boolean =>
  value.trim().length <= 254 && /^[^\s@,;<>]+@[^\s@,;<>]+\.[a-z]{2,}$/i.test(value.trim());

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api').replace(/\/$/, '');

const blank = (value: string | undefined | null): string | null => {
  const v = (value ?? '').trim();
  return v === '' ? null : v;
};

const postSubmission = async (path: string, body: unknown): Promise<SubmitResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string; data?: { emailFailed?: boolean } }
      | null;

    if (!response.ok || result?.success === false) {
      return { ok: false, error: result?.message ?? 'Something went wrong. Please try again.' };
    }

    return { ok: true, emailFailed: Boolean(result?.data?.emailFailed) };
  } catch (err) {
    console.error('[submission] request failed', err);
    return { ok: false, error: 'Network error. Please try again.' };
  }
};

export const submitContactForm = async (input: ContactSubmission): Promise<SubmitResult> => {
  if (!input.fullName.trim()) return { ok: false, error: 'Please enter your name.' };
  if (!isValidEmail(input.email)) return { ok: false, error: 'Please enter a valid email address.' };

  return postSubmission('/contact/submit', {
    enquiryType: blank(input.enquiryType),
    fullName: input.fullName.trim(),
    company: blank(input.company),
    email: input.email.trim(),
    phone: blank(input.phone),
    country: blank(input.country),
    message: blank(input.message),
    consentMarketing: Boolean(input.consentMarketing),
  });
};

export const submitBookingRequest = async (input: BookingSubmission): Promise<SubmitResult> => {
  if (!input.fullName.trim()) return { ok: false, error: 'Please enter your name.' };
  if (!isValidEmail(input.email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (input.items.length === 0) return { ok: false, error: 'Please add at least one size.' };

  const totalQuantity = input.items.reduce((sum, it) => sum + (it.quantity || 0), 0);

  return postSubmission('/bookings/submit', {
    tireId: input.tireId ?? null,
    tireName: input.tireName,
    items: input.items,
    totalQuantity,
    fullName: input.fullName.trim(),
    company: blank(input.company),
    email: input.email.trim(),
    phone: blank(input.phone),
    country: blank(input.country),
    role: blank(input.role),
    notes: blank(input.notes),
  });
};
