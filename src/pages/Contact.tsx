import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl text-emerald-deep mb-4 text-center">{t('contact.title')}</h1>
          <p className="text-stone text-center mb-16">{t('contact.subtitle')}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-emerald-deep mb-1">{t('contact.hotline')}</h3>
                  <p className="text-stone">+86 135 9017 3320</p>
                  <p className="text-stone text-sm">{t('contact.hotlineHours')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-emerald-deep mb-1">{t('contact.email')}</h3>
                  <p className="text-stone">381562675@qq.com</p>
                  <p className="text-stone text-sm">{t('contact.emailReply')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-emerald-deep mb-1">{t('contact.address')}</h3>
                  <p className="text-stone">Dubai Silicon Oasis, Dubai</p>
                  <p className="text-stone text-sm">{t('contact.addressDetail')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {submitted ? (
              <div className="bg-cream-dark/30 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-emerald-light" />
                </div>
                <h2 className="font-serif text-xl text-emerald-deep mb-2">{t('contact.sent')}</h2>
                <p className="text-stone">{t('contact.sentDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-cream-dark/30 rounded-xl p-8 space-y-4">
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.yourName')}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.yourEmail')}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.message')}</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-deep text-cream py-3 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>{t('contact.send')}</span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
