import { useState } from 'react';
import { 
  // Facebook, Instagram,  
  Mail, MapPin, Phone, ChevronDown, 
  // Youtube 
} from 'lucide-react';
import { toast } from 'sonner';
import FadeIn from '../../Shared/FadeIn';
import { useLanguage } from '../../../i18n/LanguageContext';
import PhoneInput from '../../Shared/PhoneInput';
import { submitContactForm } from '../../../lib/submissions';
import type { TranslationKey } from '../../../i18n/translations';

interface RegionRow {
  regionKey: TranslationKey;
  valueKey: TranslationKey;
}

// Regions are listed Iraq → UK → Dubai across every contact block.
const PHONE_ROWS: RegionRow[] = [
  { regionKey: 'contact.region.iraq', valueKey: 'contact.phone.iraq' },
  { regionKey: 'contact.region.uk', valueKey: 'contact.phone.uk' },
  { regionKey: 'contact.region.dubai', valueKey: 'contact.phone.dubai' },
];

const EMAIL_ROWS: RegionRow[] = [
  { regionKey: 'contact.region.iraq', valueKey: 'contact.email.iraq' },
  { regionKey: 'contact.region.uk', valueKey: 'contact.email.uk' },
  { regionKey: 'contact.region.dubai', valueKey: 'contact.email.dubai' },
];

const ADDRESS_ROWS: RegionRow[] = [
  { regionKey: 'contact.region.iraq', valueKey: 'contact.address.iraq' },
  { regionKey: 'contact.region.uk', valueKey: 'contact.address.uk' },
  { regionKey: 'contact.region.dubai', valueKey: 'contact.address.dubai' },
];

// First phone / email listed per region (used for the tel: / mailto: link target).
const firstContact = (value: string) => value.split(',')[0].trim();

// const SOCIAL_LINKS = [
//   { icon: Youtube, href: 'https://www.youtube.com/@jplanet9368', label: 'Youtube' },
//   { icon: Facebook, href: 'https://www.facebook.com/J.PlanetTire/', label: 'Facebook' },
//   { icon: Instagram, href: 'https://www.instagram.com/jplanettire/', label: 'Instagram' },
// ];

const ENQUIRY_TYPE_KEYS: TranslationKey[] = [
  'contact.enq.general',
  'contact.enq.fleetIraq',
  'contact.enq.fleetUk',
  'contact.enq.fleetDubai',
  'contact.enq.partnership',
];

const CARD = 'rounded-2xl bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.08)] border border-gray-100/70';
const INPUT =
  'w-full rounded-md border border-gray-200/80 bg-[#f4f6fb] px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#1148c6] focus:bg-white focus:outline-none transition-all duration-150';
const LABEL = 'mb-2 block text-sm font-semibold text-[#111111] tracking-tight';

const ContactFormSection = () => {
  const { t } = useLanguage();
  const [selectedEnquiryIndex, setSelectedEnquiryIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const value = (name: string) =>
      ((form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '').trim();
    const checked = (name: string) =>
      Boolean((form.elements.namedItem(name) as HTMLInputElement | null)?.checked);

    setSubmitting(true);
    const result = await submitContactForm({
      enquiryType: t(ENQUIRY_TYPE_KEYS[selectedEnquiryIndex]),
      fullName: value('fullName'),
      company: value('company'),
      email: value('workEmail'),
      phone: value('phone'),
      message: value('message'),
      consentMarketing: checked('consentNewsletter'),
    });
    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? 'Something went wrong. Please try again.');
      return;
    }
    // Saved successfully — the customer sees success even if the notification
    // email failed, since their enquiry is safely recorded either way.
    form.reset();
    setSelectedEnquiryIndex(0);
    setSent(true);
    toast.success(t('contact.successToast'));
  };

  return (
    <section className="relative z-20 -mt-24 w-full bg-[linear-gradient(to_bottom,transparent_0,transparent_6rem,#f6f6f4_6rem,#f6f6f4_100%)] font-sans selection:bg-[#1148c6]/10 md:-mt-28 md:bg-[linear-gradient(to_bottom,transparent_0,transparent_7rem,#f6f6f4_7rem,#f6f6f4_100%)]">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 pb-10 md:px-8 2xl:px-10 3xl:px-12 md:pb-14">
        <FadeIn className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
          
          {/* ================= LEFT SIDE: CONTACT CARDS OVERVIEW ================= */}
          <div className="flex flex-col justify-between space-y-5 lg:col-span-2">
            
            {/* Phone Info Block */}
            <div className={CARD}>
              <h3 className="text-[15px] font-bold text-[#111111] tracking-tight">{t('contact.callTeam')}</h3>
              <div className="mt-5 space-y-4">
                {PHONE_ROWS.map((row) => (
                  <a
                    key={row.regionKey}
                    href={`tel:${firstContact(t(row.valueKey)).replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0dc] text-[#4b6a2f] transition-transform duration-200 group-hover:scale-105">
                      <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-left">
                      <span className="text-sm font-bold text-[#111111]">{t(row.regionKey)}</span>
                      <span dir="ltr" className="text-sm font-medium text-gray-500 transition-colors group-hover:text-[#1148c6]">
                        : {t(row.valueKey)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Emails Info Block */}
            <div className={CARD}>
              <h3 className="text-[15px] font-bold text-[#111111] tracking-tight">{t('contact.emailUs')}</h3>
              <div className="mt-5 space-y-4">
                {EMAIL_ROWS.map((row) => (
                  <a
                    key={row.regionKey}
                    href={`mailto:${firstContact(t(row.valueKey))}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1edf6] text-[#2c5282] transition-transform duration-200 group-hover:scale-105">
                      <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-left">
                      <span className="text-sm font-bold text-[#111111]">{t(row.regionKey)}</span>
                      <span dir="ltr" className="text-[13px] font-medium text-gray-500 transition-colors group-hover:text-[#1148c6] break-words">
                        : {t(row.valueKey)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Address Info Block */}
            <div className={CARD}>
              <h3 className="text-[15px] font-bold text-[#111111] tracking-tight">{t('contact.address')}</h3>
              <div className="mt-5 space-y-4">
                {ADDRESS_ROWS.map((row) => (
                  <div key={row.regionKey} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0dc] text-[#4b6a2f]">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div className="grid grid-cols-[52px_1fr] items-baseline gap-2 text-left">
                      <span className="text-sm font-bold text-[#111111]">{t(row.regionKey)}</span>
                      <span className="text-[13px] font-medium leading-normal text-gray-500">{t(row.valueKey)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Channels Track */}
            {/* <div className={CARD}>
              <h3 className="text-[15px] font-bold text-[#111111] tracking-tight">{t('contact.followUs')}</h3>
              <div className="mt-4 flex items-center gap-3.5">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-5 w-5 items-center justify-center text-gray-500 transition-colors hover:text-[#1148c6]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div> */}
          </div>

          {/* ================= RIGHT SIDE: HIGH-FIDELITY ENQUIRY FORM ================= */}
          <div className="h-full w-full rounded-2xl shadow-[0_18px_60px_rgba(15,23,42,0.1)] lg:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="flex h-full flex-col justify-start rounded-2xl border border-gray-100/70 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.08)] md:p-10"
            >
              <div className="w-full text-left">
                <h3 className="text-xl font-bold text-[#111111] md:text-2xl tracking-tight">{t('contact.formTitle')}</h3>
                <p className="mt-1.5 text-sm text-gray-400 font-light tracking-wide">
                  {t('contact.formSubtitle')}
                </p>

                {/* Custom Vector Arrow Dropdown Menu Frame */}
                <div className="mt-6 flex flex-col">
                  <label htmlFor="enquiryType" className={LABEL}>
                    {t('contact.enquiryType')}
                  </label>
                  <div className="relative w-full">
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={selectedEnquiryIndex}
                      onChange={(e) => setSelectedEnquiryIndex(Number(e.target.value))}
                      className={`${INPUT} appearance-none pr-12 font-medium cursor-pointer text-gray-700`}
                    >
                      {ENQUIRY_TYPE_KEYS.map((key, index) => (
                        <option key={key} value={index}>{t(key)}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" strokeWidth={2.5} />
                  </div>
                </div>

                {/* 2-Column Inputs Grid Layer 1 */}
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className={LABEL}>
                      {t('form.fullName')}
                    </label>
                    <input id="fullName" name="fullName" type="text" placeholder={t('form.namePlaceholder')} className={INPUT} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="company" className={LABEL}>
                      {t('form.company')}
                    </label>
                    <input id="company" name="company" type="text" placeholder={t('form.companyPlaceholder')} className={INPUT} />
                  </div>
                </div>

                {/* 2-Column Inputs Grid Layer 2 */}
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="workEmail" className={LABEL}>
                      {t('form.workEmail')}
                    </label>
                    <input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      className={INPUT}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className={LABEL}>
                      {t('form.phone')}
                    </label>
                    <PhoneInput name="phone" defaultCountry="GB" placeholder={t('form.phonePlaceholder')} />
                  </div>
                </div>

                {/* Textarea Multi-line Comment Box */}
                <div className="mt-5 flex flex-col">
                  <label htmlFor="message" className={LABEL}>
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t('form.messagePlaceholder')}
                    className={`${INPUT} resize-none min-h-[140px] leading-relaxed`}
                  />
                </div>

                {/* Consent checkboxes */}
                <div className="mt-5 space-y-3">
                  <label htmlFor="consentPrivacy" className="flex items-start gap-2.5 text-[12px] leading-relaxed text-gray-500">
                    <input
                      id="consentPrivacy"
                      name="consentPrivacy"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#1148c6] focus:ring-[#1148c6]"
                    />
                    <span>
                      {t('contact.consentPrivacy')}{' '}
                      <a href="/privacy" className="font-semibold text-[#1148c6] underline hover:text-[#0033aa]">
                        {t('contact.consentPrivacyLink')}
                      </a>
                    </span>
                  </label>
                  <label htmlFor="consentNewsletter" className="flex items-start gap-2.5 text-[12px] leading-relaxed text-gray-500">
                    <input
                      id="consentNewsletter"
                      name="consentNewsletter"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#1148c6] focus:ring-[#1148c6]"
                    />
                    <span>{t('contact.consentNewsletter')}</span>
                  </label>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="mt-8 flex w-full flex-wrap items-center gap-4 text-left">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#003bc2] px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-150 hover:bg-[#0033aa] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t('form.sending') : t('form.send')}
                </button>
                {sent && (
                  <p className="text-sm font-semibold text-[#4b6a2f]">{t('contact.successToast')}</p>
                )}
              </div>
            </form>
          </div>

        </FadeIn>
      </div>
    </section>
  );
};

export default ContactFormSection;
