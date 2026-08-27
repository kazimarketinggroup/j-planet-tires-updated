import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

// Replace this placeholder with your actual blurred background event image route
import eventBgImage from '../../../assets/exhibation/hero.png';

const TEAM_MEMBERS = ['Callum', 'Betsi', 'Alex', 'Viridiana'];

const INPUT_STYLE = 
  'w-full rounded-md border border-gray-200/80 bg-[#f4f6fb] px-3.5 py-2.5 2xl:px-4 2xl:py-3 text-sm 2xl:text-base font-light text-gray-800 placeholder:text-gray-400 focus:border-[#0f46c7] focus:bg-white focus:outline-none transition-all duration-150';
const LABEL_STYLE = 
  'mb-1.5 block text-xs 2xl:text-sm font-bold text-gray-800 tracking-wide';

// Google Apps Script Web App endpoint — submissions go directly to the linked Google Sheet
const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcpGnkwRbdob-Wc9JU9MVoSz8qXJj1O7WnRBeBzTwLB9Z-SHdBxs9hzq3spJ4Pmw/exec';

export const RTXEventSection: React.FC = () => {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedMember) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      spokenWith: selectedMember,
      feedback: (form.elements.namedItem('feedback') as HTMLTextAreaElement).value,
    };

    try {
      await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script doesn't return a readable CORS response — a non-throwing fetch counts as success
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      form.reset();
      setSelectedMember('');

      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-screen-dvh w-full items-center justify-center overflow-hidden bg-neutral-900 pt-24 pb-12 font-sans select-none sm:pt-28 md:pt-32 md:pb-16 lg:py-28 2xl:py-32">
      
      {/* ================= 1. BACKGROUND INFRASTRUCTURE ================= */}
      <div 
        className="absolute inset-0 bg-cover bg-center object-cover pointer-events-none filter brightness-[0.45] scale-[1.02]"
        style={{ backgroundImage: `url(${eventBgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/30 pointer-events-none" />

      {/* ================= 2. MAIN LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-12 2xl:max-w-[1320px] 2xl:px-10 3xl:max-w-[1500px] 3xl:px-12 4xl:max-w-[1700px]">
        
        {/* LEFT COLUMN: EVENT DETAILS CARD BLOCK */}
        <div className="mt-8 flex max-w-2xl flex-col items-start text-left text-white select-text md:mt-0 lg:col-span-6 lg:max-w-none">
          
          {/* Upper Micro Pill Tag Badge */}
          <div className="mb-5 inline-block rounded-md border border-[#4b6d47]/30 bg-[#2d472a]/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#a1d99b] backdrop-blur-sm md:mb-6 2xl:px-4 2xl:py-2 2xl:text-sm">
            {t('rtx.badge')}
          </div>

          {/* Core Feature Event Title */}
          <h1 className="mb-8 text-[34px] font-semibold leading-[1.1] tracking-tight text-white antialiased drop-shadow-sm sm:text-[44px] md:mb-10 md:text-[50px] lg:text-[50px] 2xl:text-[58px] 3xl:text-[64px]">
            {t('rtx.titleLine1')} <br />
            {t('rtx.titleLine2')}
          </h1>

          {/* Segment Tiers Data Grid */}
          <div className="w-full max-w-lg space-y-5 md:space-y-6 2xl:max-w-xl 2xl:space-y-7">

            {/* Row Item 1: Event Timeline */}
            <div className="flex items-start gap-4 2xl:gap-5">
              <span className="flex h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 items-center justify-center rounded-lg bg-[#0f46c7] text-white shadow-md">
                <Calendar className="h-5 w-5 2xl:h-6 2xl:w-6" strokeWidth={2.2} />
              </span>
              <div className="flex flex-col">
                <span className="text-xs 2xl:text-sm font-bold uppercase tracking-widest text-neutral-400">{t('rtx.dates')}</span>
                <span className="text-sm sm:text-[15px] 2xl:text-lg font-bold text-white mt-1">
                  {t('rtx.datesValue')}
                </span>
              </div>
            </div>

            {/* Row Item 2: Geolocation Venue Address */}
            <div className="flex items-start gap-4 2xl:gap-5">
              <span className="flex h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 items-center justify-center rounded-lg bg-[#0f46c7] text-white shadow-md">
                <MapPin className="h-5 w-5 2xl:h-6 2xl:w-6" strokeWidth={2.2} />
              </span>
              <div className="flex flex-col">
                <span className="text-xs 2xl:text-sm font-bold uppercase tracking-widest text-neutral-400">{t('rtx.location')}</span>
                <span className="text-sm sm:text-[15px] 2xl:text-lg font-bold text-white mt-1 leading-normal">
                  NAEC Stoneleigh, Warwickshire, CV8 2LH
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: LEAD CAPTURE PREMIUM FORM MATTE INSULATION */}
        <div className="mt-6 flex w-full justify-center lg:col-span-6 lg:mt-0 lg:translate-y-10 lg:justify-end 2xl:translate-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-[540px] rounded-2xl bg-[#f8f9fa] p-5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-6 md:p-7 lg:max-w-[520px] 2xl:max-w-[580px] 2xl:p-8"
          >
            <h3 className="text-base 2xl:text-xl font-extrabold text-neutral-900 tracking-tight mb-4 2xl:mb-6">{t('rtx.formTitle')}</h3>

            <form onSubmit={handleSubmit} className="space-y-3 2xl:space-y-4">

              {/* Field Pair Group 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4">
                <div>
                  <label htmlFor="name" className={LABEL_STYLE}>{t('rtx.name')}</label>
                  <input id="name" name="name" required type="text" placeholder={t('form.namePlaceholder')} className={INPUT_STYLE} />
                </div>
                <div>
                  <label htmlFor="company" className={LABEL_STYLE}>{t('rtx.company')}</label>
                  <input id="company" name="company" type="text" placeholder={t('form.companyPlaceholder')} className={INPUT_STYLE} />
                </div>
              </div>

              {/* Field Pair Group 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4">
                <div>
                  <label htmlFor="role" className={LABEL_STYLE}>{t('rtx.role')}</label>
                  <input id="role" name="role" type="text" placeholder={t('rtx.rolePlaceholder')} className={INPUT_STYLE} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL_STYLE}>{t('rtx.email')}</label>
                  <input id="email" name="email" required type="email" placeholder={t('form.emailPlaceholder')} className={INPUT_STYLE} />
                </div>
              </div>

              {/* Field Pair Group 3: Phone + Custom Team Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 2xl:gap-4">
                <div>
                  <label htmlFor="phone" className={LABEL_STYLE}>{t('rtx.phone')}</label>
                  <input id="phone" name="phone" required type="tel" placeholder="+44" className={INPUT_STYLE} />
                </div>

                <div className="relative">
                  <label className={LABEL_STYLE}>{t('rtx.spokenWith')}</label>

                  {/* Select Trigger Box */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex w-full items-center justify-between gap-2 rounded-md border border-[#c1d1be] bg-[#dbe6d7] px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none transition-colors hover:bg-[#d1debcd] focus:border-[#4b6d47] 2xl:px-5 2xl:py-3 2xl:text-base"
                  >
                    <span className={`min-w-0 truncate ${selectedMember ? 'text-gray-900' : 'text-gray-700/90'}`}>
                      {selectedMember || t('rtx.selectMember')}
                    </span>
                    <ChevronDown size={15} className={`shrink-0 text-gray-700 transition-transform duration-300 2xl:h-[18px] 2xl:w-[18px] ${isDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                  </button>

                  {/* Dropdown Items Menu Portal Overlay */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-[102%] z-30 bg-[#dbe6d7] border border-[#c1d1be] rounded-md shadow-xl overflow-hidden"
                      >
                        <div className="flex flex-col py-0.5">
                          {TEAM_MEMBERS.map((member) => (
                            <button
                              key={member}
                              type="button"
                              onClick={() => {
                                setSelectedMember(member);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 2xl:px-5 2xl:py-2.5 text-sm 2xl:text-base font-semibold text-gray-800 hover:bg-[#cedcc9] transition-colors border-b border-[#c8d7c4]/40 last:border-0"
                            >
                              {member}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Textarea Comment Box */}
              <div>
                <label htmlFor="feedback" className={LABEL_STYLE}>{t('rtx.feedback')}</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={2}
                  placeholder={t('rtx.feedbackPlaceholder')}
                  className={`${INPUT_STYLE} resize-none text-sm 2xl:text-base leading-relaxed`}
                />
              </div>

              {/* Submission status feedback */}
              {submitStatus === 'success' && (
                <p className="text-xs 2xl:text-sm font-semibold text-green-600">{t('rtx.success')}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-xs 2xl:text-sm font-semibold text-red-600">
                  {!selectedMember ? t('rtx.errSelect') : t('rtx.errGeneric')}
                </p>
              )}

              {/* Submit Alignment Trigger Button */}
              <div className="w-full flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 2xl:px-10 2xl:py-2.5 bg-[#0e43c2] hover:bg-[#0a359c] text-white font-bold text-sm 2xl:text-base rounded-md shadow-md transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('rtx.submitting') : t('rtx.submit')}
                </button>
              </div>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default RTXEventSection;
