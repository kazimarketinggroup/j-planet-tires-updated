import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { toast } from 'sonner';
import CountrySelect from '../../Shared/CountrySelect';
import PhoneInput from '../../Shared/PhoneInput';
import { submitBookingRequest } from '../../../lib/submissions';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { TireDetail } from './publicApi';
import type { TireSize } from '../../../admin/types/database';

interface QuoteModalProps {
  tire: TireDetail;
  onClose: () => void;
  // When set, that size starts selected and pre-added with quantity 1 — used by
  // the per-size detail page so "Request Quote" opens straight onto that size.
  initialSizeId?: string;
}

const QuoteModal = ({ tire, onClose, initialSizeId }: QuoteModalProps) => {
  const { t } = useLanguage();
  const sizes = useMemo(
    () => [...tire.sizes].sort((a, b) => a.display_order - b.display_order),
    [tire.sizes],
  );

  // Only honour an initial size that actually belongs to this tire.
  const validInitialId = initialSizeId && sizes.some((s) => s.id === initialSizeId) ? initialSizeId : '';

  const [quantities, setQuantities] = useState<Record<string, number>>(
    validInitialId ? { [validInitialId]: 1 } : {},
  );
  const [selectedSizeId, setSelectedSizeId] = useState(validInitialId);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const addedSizes = sizes.filter((size) => (quantities[size.id] ?? 0) > 0);
  const selectedQuantity = selectedSizeId ? quantities[selectedSizeId] ?? 0 : 0;
  const totalQuantity = addedSizes.reduce((total, size) => total + (quantities[size.id] ?? 0), 0);

  const setQuantity = (id: string, nextQuantity: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, nextQuantity),
    }));
  };

  const sizeLabel = (size: TireSize) => size.size || size.model_label || size.pattern || tire.name;

  const updateSelectedQuantity = (nextQuantity: number) => {
    if (!selectedSizeId) return;
    setQuantity(selectedSizeId, nextQuantity);
  };

  const inputClass =
    'mt-1.5 h-9 w-full rounded border border-gray-300 bg-[#f2f3f8] px-3 text-xs font-medium text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-[#1148c6] focus:bg-white';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    if (addedSizes.length === 0) {
      toast.error(t('quote.noSizes'));
      return;
    }

    const form = event.currentTarget;
    const value = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? '').trim();

    setSubmitting(true);
    const result = await submitBookingRequest({
      tireId: tire.id,
      tireName: tire.name,
      items: addedSizes.map((size) => ({
        size: sizeLabel(size),
        quantity: quantities[size.id] ?? 0,
        sizeId: size.id,
      })),
      fullName: value('name'),
      company: value('company'),
      email: value('email'),
      phone: value('phone'),
      country: value('country'),
      role: value('role'),
    });
    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? 'Something went wrong. Please try again.');
      return;
    }
    // Saved — show success regardless of whether the notification email sent.
    toast.success(t('quote.successToast'));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto bg-[#f3f3f3] p-4 shadow-2xl md:overflow-visible md:p-7"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quote form"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white hover:text-[#111111]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-gray-300 pb-2 pr-10">
          <h2 id="quote-modal-title" className="text-xl font-black uppercase leading-tight text-[#111111]">
            {t('quote.title')} - {tire.name}
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 md:text-sm">{t('quote.subtitle')}</p>
        </div>

        <form
          className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,0.85fr)_1fr]"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700 md:text-sm">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1148c6] text-[10px] text-white md:h-5 md:w-5">
                1
              </span>
              {t('quote.step1')}
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-2">
              <label className="relative block">
                <span className="sr-only">{t('quote.selectSizes')}</span>
                <select
                  value={selectedSizeId}
                  onChange={(event) => setSelectedSizeId(event.target.value)}
                  disabled={sizes.length === 0}
                  className="h-10 w-full appearance-none rounded bg-white px-3 pr-9 text-xs font-bold text-gray-700 outline-none transition-colors focus:ring-2 focus:ring-[#1148c6] disabled:cursor-not-allowed disabled:text-gray-400 md:text-sm"
                >
                  <option value="">{t('quote.selectSizes')}</option>
                  {sizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {sizeLabel(size)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111111]" />
              </label>

              <div className="grid h-10 grid-cols-[28px_22px_1fr_22px] items-center gap-1.5 rounded bg-white px-2.5">
                <span className="text-xs font-bold text-gray-700">{t('quote.qty')}</span>
                <button
                  type="button"
                  onClick={() => updateSelectedQuantity(selectedQuantity - 1)}
                  disabled={!selectedSizeId}
                  className="inline-flex h-5 items-center justify-center rounded border border-gray-300 bg-white text-xs font-bold text-gray-500 transition-colors hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease selected size quantity"
                >
                  -
                </button>
                <span className="text-center text-xs font-black text-[#111111]">{selectedQuantity}</span>
                <button
                  type="button"
                  onClick={() => updateSelectedQuantity(selectedQuantity + 1)}
                  disabled={!selectedSizeId}
                  className="inline-flex h-5 items-center justify-center rounded border border-gray-300 bg-white text-xs font-bold text-gray-500 transition-colors hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase selected size quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded bg-white">
              <div className="px-4 py-2.5 text-xs font-bold text-gray-700 md:text-sm">{t('quote.added')}</div>
              <div className="min-h-36 max-h-44 overflow-y-auto">
                {addedSizes.length === 0 ? (
                  <p className="px-4 pb-5 pt-1 text-xs text-gray-400">{t('quote.noSizes')}</p>
                ) : (
                  addedSizes.map((size) => (
                    <div
                      key={size.id}
                      className="grid min-h-8 grid-cols-[1fr_44px_24px] items-center border-b border-gray-200 px-4 text-xs text-gray-600 last:border-0 md:text-sm"
                    >
                      <span className="truncate pr-3 font-medium">{sizeLabel(size)}</span>
                      <span className="text-center font-bold text-gray-500">{quantities[size.id]}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(size.id, 0)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#111111]"
                        aria-label={`Remove ${sizeLabel(size)}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="flex h-10 items-center justify-between bg-[#1148c6] px-4 text-white">
                <span className="text-xs font-bold md:text-sm">{t('quote.total').replace('{n}', String(totalQuantity))}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700 md:text-sm">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1148c6] text-[10px] text-white md:h-5 md:w-5">
                2
              </span>
              {t('quote.step2')}
            </div>

            <div className="rounded-xl bg-white p-4 md:p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Row 1: Name | Country */}
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.name')}
                  <input className={inputClass} name="name" placeholder={t('form.namePlaceholder')} required />
                </label>
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.country')}
                  <CountrySelect name="country" size="compact" placeholder={t('quote.countryPlaceholder')} className="mt-1.5" />
                </label>

                {/* Row 2: Email | Phone */}
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.email')}
                  <input className={inputClass} name="email" type="email" placeholder={t('form.emailPlaceholder')} required />
                </label>
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.phone')}
                  <PhoneInput name="phone" size="compact" defaultCountry="GB" placeholder={t('form.phonePlaceholder')} className="mt-1.5" />
                </label>

                {/* Row 3: Company | Role */}
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.company')}
                  <input className={inputClass} name="company" placeholder={t('form.companyPlaceholder')} />
                </label>
                <label className="text-xs font-bold text-[#111111] md:text-sm">
                  {t('quote.role')}
                  <input className={inputClass} name="role" placeholder={t('quote.rolePlaceholder')} />
                </label>
              </div>

              <p className="mt-6 text-xs font-medium text-gray-400 md:text-sm">
                {t('quote.replyNote')}
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-10 w-full items-center justify-center rounded bg-[#1148c6] px-7 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0d39a0] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-52 md:text-sm"
              >
                {submitting ? t('form.sending') : t('quote.submit')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
