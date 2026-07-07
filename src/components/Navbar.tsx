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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} className={scrolled ? 'text-primary' : 'text-white'} />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  scrolled ? 'text-text-secondary hover:text-accent' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-accent' : 'bg-white'
                }`} />
              </Link>
            ))}
          </div>

          <Link to="/" className={`font-serif text-xl md:text-2xl tracking-wider ${
            scrolled ? 'text-primary' : 'text-white'
          }`}>
            {t('nav.brand')}
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  scrolled ? 'text-text-secondary hover:text-accent' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-accent' : 'bg-white'
                }`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
                  scrolled 
                    ? 'text-text-secondary hover:text-accent hover:bg-gray-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Globe size={18} />
                <span className="text-xs font-medium">{i18n.language === 'zh' ? '中文' : 'EN'}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[120px] z-50 border border-border-light">
                  <button
                    onClick={() => changeLanguage('zh')}
                    className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                      i18n.language === 'zh' ? 'text-accent bg-accent/5' : 'text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    中文
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full px-4 py-2 text-left text-sm font-medium transition-colors ${
                      i18n.language === 'en' ? 'text-accent bg-accent/5' : 'text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className={`relative p-2 rounded-lg transition-colors ${
                scrolled 
                  ? 'text-text-secondary hover:text-accent hover:bg-gray-100' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-md">
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
          <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <span className="font-serif text-xl text-primary">{t('nav.brand')}</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                  className="block text-lg text-text-primary hover:text-accent transition-colors py-3 px-4 rounded-lg hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-border-light">
                <button
                  onClick={() => changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
                  className="flex items-center gap-2 w-full py-3 px-4 text-text-secondary hover:text-accent transition-colors"
                >
                  <Globe size={18} />
                  <span>{i18n.language === 'zh' ? 'English' : '中文'}</span>
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
