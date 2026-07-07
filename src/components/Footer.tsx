import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl text-white mb-6">{t('footer.brand')}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t('footer.brandDesc')}
            </p>

          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/products', label: t('nav.products') },
                { to: '/about', label: t('nav.about') },
                { to: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">{t('footer.customerService')}</h4>
            <ul className="space-y-3">
              {[t('footer.shipping'), t('footer.returns'), t('footer.faq'), t('footer.privacy')].map((item) => (
                <li key={item}>
                  <span className="text-white/70 hover:text-accent transition-colors text-sm cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium">400-888-9999</p>
                  <p className="text-white/50 text-xs">{t('contact.hotlineHours')}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium">service@zhenpin.com</p>
                  <p className="text-white/50 text-xs">{t('contact.emailReply')}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium">1788 Nanjing West Rd</p>
                  <p className="text-white/50 text-xs">Shanghai, China</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">{t('footer.copyright')}</p>
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <span className="hover:text-accent transition-colors cursor-pointer">{t('footer.privacy')}</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
