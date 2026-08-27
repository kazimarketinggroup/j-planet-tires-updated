import { Link } from 'react-router-dom';
import { Facebook, Instagram,  Linkedin,  Mail, Phone,  Youtube } from 'lucide-react';
import navLogo from '../../assets/home/J Planet Logo.png';
import FadeIn from './FadeIn';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

const EXPLORE_LINKS: { labelKey: TranslationKey; to: string }[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.tires', to: '/tires' },
  { labelKey: 'nav.contact', to: '/contact' },
];

const LEGAL_LINKS: { labelKey: TranslationKey; to: string }[] = [
  { labelKey: 'footer.terms', to: '/terms' },
  { labelKey: 'footer.privacy', to: '/privacy' },
  { labelKey: 'footer.warranty', to: '/warranty' },
];

const EMAILS = ['info@jplanettire.net', 'info@jplanettire.co.uk'];
const PHONES = ['+44 1902 200269', '+44 20 7088 8353'];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://www.facebook.com/J.PlanetTire/', label: 'Facebook' },
  // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/jplanettire/', label: 'Instagram' },
  // { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@jplanet9368', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jplanet-tireuk/', label: 'LinkedIN' },
];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-300 bg-[#f6f6f6] font-sans">
      <div className="mx-auto max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] px-5 py-9 md:px-8 2xl:px-10 2xl:py-14 3xl:px-12 3xl:py-16 4xl:px-16">
        <FadeIn className="grid grid-cols-1 gap-10 md:grid-cols-[1.45fr_0.7fr_0.8fr_0.95fr] md:gap-14 2xl:gap-16 3xl:gap-20">
          {/* Left: Logo & Description */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-7 w-7 overflow-hidden 2xl:h-9 2xl:w-9">
                <img src={navLogo} alt="" className="h-7 w-auto object-cover object-left 2xl:h-9" />
              </div>
              <span className="text-sm font-black tracking-tight text-[#111132] 2xl:text-lg 3xl:text-xl">J.PLANET TIRE</span>
            </Link>

            <p className="mt-8 max-w-[235px] text-sm font-medium leading-6 text-gray-500 2xl:max-w-[300px] 2xl:text-base 2xl:leading-7 3xl:max-w-[340px] 3xl:text-lg">
              {t('footer.description')}
            </p>

            <div className="mt-6 flex items-center gap-4 2xl:mt-8 2xl:gap-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111132] text-white shadow-sm transition-colors hover:bg-[#1148c6] 2xl:h-10 2xl:w-10"
                >
                  <Icon className="h-[18px] w-[18px] stroke-current 2xl:h-5 2xl:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Explore Links */}
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-[#111132] 2xl:text-lg 3xl:text-xl">{t('footer.explore')}</h3>
            <ul className="mt-8 space-y-3 2xl:mt-9 2xl:space-y-4">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm font-medium text-gray-500 hover:text-[#1148c6] 2xl:text-base 3xl:text-lg">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle-Right: Legal Links */}
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-[#111132] 2xl:text-lg 3xl:text-xl">{t('footer.legal')}</h3>
            <ul className="mt-8 space-y-3 2xl:mt-9 2xl:space-y-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm font-medium text-gray-500 hover:text-[#1148c6] 2xl:text-base 3xl:text-lg">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact Us */}
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-[#111132] 2xl:text-lg 3xl:text-xl">{t('footer.contactUs')}</h3>
            <div className="mt-8 space-y-5 2xl:mt-9 2xl:space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#111132] 2xl:h-6 2xl:w-6" />
                <div className="space-y-1.5 2xl:space-y-2">
                  {EMAILS.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-sm font-medium text-gray-500 hover:text-[#1148c6] 2xl:text-base 3xl:text-lg"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#111132] 2xl:h-6 2xl:w-6" />
                <div className="space-y-1.5 2xl:space-y-2">
                  {PHONES.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="block text-sm font-medium text-gray-500 hover:text-[#1148c6] 2xl:text-base 3xl:text-lg"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col gap-3 border-t border-gray-300 pt-6 md:flex-row md:items-center md:justify-between 2xl:mt-12 2xl:pt-8">
          <p className="text-xs text-gray-500 2xl:text-sm">{t('footer.copyright').replace('{year}', String(year))}</p>
          <p className="text-sm font-medium text-gray-500 2xl:text-base">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
