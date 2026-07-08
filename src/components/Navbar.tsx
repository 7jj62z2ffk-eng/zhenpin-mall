import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, Globe, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../stores/cartStore';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [location, isRTL, i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setLangOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/products', label: t('nav.products') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-cream-dark transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} className={scrolled ? 'text-emerald-deep' : 'text-cream'} />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => {
              const isActive = location.pathname === link.to;
              return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wider transition-colors group ${
                  isActive
                    ? (scrolled ? 'text-gold' : 'text-gold-light')
                    : (scrolled ? 'text-emerald-deep hover:text-gold' : 'text-cream/90 hover:text-cream')
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  isActive ? 'w-full bg-gold' : 'w-0 group-hover:w-full ' + (scrolled ? 'bg-gold' : 'bg-cream')
                }`} />
              </Link>
              );
            })}
          </div>

          <Link to="/" className={`font-serif text-xl md:text-2xl tracking-wider ${
            scrolled ? 'text-emerald-deep' : 'text-cream'
          }`}>
            {t('nav.brand')}
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => {
              const isActive = location.pathname === link.to;
              return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wider transition-colors group ${
                  isActive
                    ? (scrolled ? 'text-gold' : 'text-gold-light')
                    : (scrolled ? 'text-emerald-deep hover:text-gold' : 'text-cream/90 hover:text-cream')
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  isActive ? 'w-full bg-gold' : 'w-0 group-hover:w-full ' + (scrolled ? 'bg-gold' : 'bg-cream')
                }`} />
              </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
                  scrolled 
                    ? 'text-emerald-deep hover:text-gold hover:bg-cream-dark' 
                    : 'text-cream/90 hover:text-cream hover:bg-white/10'
                }`}
              >
                <Globe size={18} />
                <span className="text-xs font-medium">{i18n.language === 'ar' ? 'العربية' : 'EN'}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-cream rounded-xl shadow-lg py-2 min-w-[140px] z-50 border border-cream-dark">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full px-4 py-2 text-start text-sm font-medium transition-colors ${
                      i18n.language === 'en' ? 'text-gold bg-gold/10' : 'text-emerald-deep hover:bg-cream-dark'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`w-full px-4 py-2 text-start text-sm font-medium transition-colors ${
                      i18n.language === 'ar' ? 'text-gold bg-gold/10' : 'text-emerald-deep hover:bg-cream-dark'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-lg transition-colors ${
                scrolled 
                  ? 'text-emerald-deep hover:text-gold hover:bg-cream-dark' 
                  : 'text-cream/90 hover:text-cream hover:bg-white/10'
              }`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-cream z-50 lg:hidden shadow-lg">
            <div className="flex items-center justify-between p-6 border-b border-cream-dark">
              <span className="font-serif text-xl text-emerald-deep">{t('nav.brand')}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-cream-dark transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg text-emerald-deep hover:text-gold transition-colors py-3 px-4 rounded-lg hover:bg-cream-dark"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-cream-dark">
                <button
                  onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                  className="flex items-center gap-2 w-full py-3 px-4 text-stone hover:text-gold transition-colors"
                >
                  <Globe size={18} />
                  <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
