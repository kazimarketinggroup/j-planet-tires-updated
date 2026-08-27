import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import navLogo from '../../assets/home/J Planet Logo white.png';
import Button from './Button';
import LanguageDropdown from './LanguageDropdown';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

interface NavLink {
  labelKey: TranslationKey;
  to: string;
  // Optional dropdown of sub-pages (e.g. the tyre categories under "Tires").
  submenu?: { labelKey: TranslationKey; to: string }[];
}

const NAV_LINKS: NavLink[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.about', to: '/about' },
  {
    labelKey: 'nav.tires',
    to: '/tires',
    submenu: [
      { labelKey: 'nav.allTires', to: '/tires' },
      { labelKey: 'range.pcr.title', to: '/tires/pcr-sub-tires' },
      { labelKey: 'range.tbr.title', to: '/tires/tbr-tires' },
      { labelKey: 'range.otr.title', to: '/tires/otr-tires' },
    ],
  },
  { labelKey: 'nav.news', to: '/news' },
  { labelKey: 'nav.contact', to: '/contact' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Which nav item's dropdown is open (by `to`). Desktop uses hover; mobile taps.
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  // Close the mobile menu when tapping/clicking anywhere outside the header.
  useEffect(() => {
    if (!isMenuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  const isLinkActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 w-full font-sans transition-colors ${
        isScrolled ? 'border-t-[5px] border-[#1148c6] bg-[#0a1b3d] shadow-md' : 'border-t-[5px] border-[#1148c6]'
      }`}
    >
      <div className="bg-[#6e9d2f]">
        <div className="mx-auto flex max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-5 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 2xl:py-2.5">
          <p className="min-w-0 flex-1 text-[10.5px] font-semibold leading-snug text-white sm:truncate sm:text-[11px] md:text-sm 2xl:text-base">
            {t('topbar.tagline')}
          </p>

          <div className="flex shrink-0 items-center gap-4 2xl:gap-6">
            <a
              href="tel:+441902200269"
              dir="ltr"
              className="hidden items-center gap-2 text-[11px] font-semibold text-white transition-colors hover:text-white/80 sm:flex md:text-sm 2xl:text-base"
            >
              <Phone className="h-4 w-4 2xl:h-5 2xl:w-5" />
              <bdi>+44 1902 200269</bdi>
            </a>

            {/* <div className="flex items-center gap-1.5 2xl:gap-2">
              <svg
                viewBox="0 0 30 20"
                role="img"
                aria-label="European Union"
                // title="European Union"
                className="h-3.5 w-5 shrink-0 rounded-[2px] 2xl:h-4 2xl:w-6"
              >
                <rect width="30" height="20" fill="#003399" />
                {Array.from({ length: 12 }).map((_, index) => {
                  const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
                  const cx = 15 + 7 * Math.cos(angle);
                  const cy = 10 + 7 * Math.sin(angle);
                  return <circle key={index} cx={cx} cy={cy} r="0.9" fill="#FFCC00" />;
                })}
              </svg>

              <svg
                viewBox="0 0 30 20"
                role="img"
                aria-label="United Kingdom"
                // title="United Kingdom"
                className="h-3.5 w-5 shrink-0 rounded-[2px] 2xl:h-4 2xl:w-6"
              >
                <rect width="30" height="20" fill="#00247D" />
                <path d="M0 0L30 20M30 0L0 20" stroke="#FFFFFF" strokeWidth="4" />
                <path d="M0 0L30 20M30 0L0 20" stroke="#CF142B" strokeWidth="1.6" />
                <path d="M15 0V20M0 10H30" stroke="#FFFFFF" strokeWidth="6.5" />
                <path d="M15 0V20M0 10H30" stroke="#CF142B" strokeWidth="4" />
              </svg>
            </div> */}

            <LanguageDropdown />
          </div>
        </div>
      </div>

      <div
        className={
          isScrolled
            ? 'bg-[#0a1b3d]/95 backdrop-blur-sm'
            : 'bg-gradient-to-b from-black/60 via-black/35 to-transparent'
        }
      >
        <div className="mx-auto flex max-w-6xl 2xl:max-w-[1320px] 3xl:max-w-[1500px] 4xl:max-w-[1700px] items-center justify-between px-5 py-3 md:px-8 2xl:px-10 3xl:px-12 4xl:px-16 2xl:py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={navLogo} alt="J.Planet Tire" className="h-8 w-auto object-contain md:h-9 2xl:h-11 3xl:h-12" />
          </Link>

          <div className="hidden items-center gap-9 lg:flex 2xl:gap-11 3xl:gap-12">
            <nav className="flex items-center gap-7 2xl:gap-9 3xl:gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.to);
                const linkClass = `text-base transition-colors 2xl:text-lg 3xl:text-xl ${
                  isActive ? 'font-semibold text-white' : 'font-medium text-white/75 hover:text-white'
                }`;

                if (!link.submenu) {
                  return (
                    <Link key={link.to} to={link.to} className={linkClass}>
                      {t(link.labelKey)}
                    </Link>
                  );
                }

                // Dropdown parent: opens on hover/focus, links go to sub-pages.
                return (
                  <div
                    key={link.to}
                    className="group relative"
                    onMouseEnter={() => setOpenSubmenu(link.to)}
                    onMouseLeave={() => setOpenSubmenu((cur) => (cur === link.to ? null : cur))}
                  >
                    <Link to={link.to} className={`inline-flex items-center gap-1 ${linkClass}`}>
                      {t(link.labelKey)}
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </Link>

                    <div className="pointer-events-none absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                      <div className="min-w-[220px] overflow-hidden rounded-lg border border-white/10 bg-[#0a1b3d] py-1.5 shadow-xl">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/10 ${
                              pathname === item.to ? 'font-semibold text-white' : 'text-white/80'
                            }`}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <Button to="/contact" size="slim" className="uppercase tracking-wide 2xl:px-6 2xl:py-2 2xl:text-base">
              {t('nav.getQuote')}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col gap-4 overflow-hidden border-t border-white/10 bg-[#0a1b3d]/95 px-5 py-4 backdrop-blur-sm lg:hidden"
            >
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link.to);
                const linkClass = `text-base ${isActive ? 'font-semibold text-white' : 'text-white/75'}`;

                if (!link.submenu) {
                  return (
                    <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className={linkClass}>
                      {t(link.labelKey)}
                    </Link>
                  );
                }

                const isOpen = openSubmenu === link.to;
                return (
                  <div key={link.to} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link to={link.to} onClick={() => setIsMenuOpen(false)} className={linkClass}>
                        {t(link.labelKey)}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenSubmenu((cur) => (cur === link.to ? null : link.to))}
                        aria-label={`Toggle ${t(link.labelKey)} submenu`}
                        aria-expanded={isOpen}
                        className="p-1 text-white/70"
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {isOpen && (
                      <div className="mt-2 flex flex-col gap-2.5 border-l border-white/15 pl-4">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-sm ${
                              pathname === item.to ? 'font-semibold text-white' : 'text-white/70'
                            }`}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Button to="/contact" className="w-full uppercase tracking-wide">
                {t('nav.getQuote')}
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
