import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Building2, Copy, CheckCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

// 请访问 https://web3forms.com/ 获取免费的 access_key，替换下方值即可直接发邮件
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY';

const BANK_DETAILS = {
  accountNo: '63007982843',
  accountName: 'SHENZHEN EXCELLENT VOYAGE INTERNATIONAL LOGISTIC CO.,LTD.',
  bankName: 'JPMorgan Chase Bank N.A. HK Branch',
  swift: 'CHASHKHHXXX',
  sortCode: '007',
  branch: '863',
  bankAddress: 'Chater House, 8 Connaught Road Central, Hong Kong',
  memo: 'Buyer Name + PI No. + Halal Herbal Tea Bags',
};

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore
    }
  };

  const CopyButton = ({ field, value }: { field: string; value: string }) => (
    <button
      type="button"
      onClick={() => handleCopy(field, value)}
      className="p-1.5 rounded-lg hover:bg-cream-dark transition-colors text-stone hover:text-gold"
    >
      {copiedField === field ? <CheckCheck size={14} className="text-emerald-light" /> : <Copy size={14} />}
    </button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';

    // 如果未配置 Web3Forms key，回退到 mailto
    if (WEB3FORMS_KEY === 'YOUR_ACCESS_KEY') {
      const subject = `Contact from ${name} | Saffron Heritage`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:381562675@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => setSubmitted(true), 500);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('subject', `New Contact from ${name} | Saffron Heritage`);
    formData.append('replyto', email);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert(t('contact.sendFailed'));
      }
    } catch {
      alert(t('contact.networkError'));
    } finally {
      setLoading(false);
    }
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

              <div className="mt-8 p-5 bg-cream-dark/30 rounded-xl border border-cream-dark">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-emerald-deep mb-1">{t('contact.bankTransfer')}</h3>
                    <p className="text-stone text-sm">{t('contact.bankTransferDesc')}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone mb-0.5">{t('checkout.accountNo')}</p>
                      <p className="text-emerald-deep font-mono text-sm font-medium">{BANK_DETAILS.accountNo}</p>
                    </div>
                    <CopyButton field="c-accountNo" value={BANK_DETAILS.accountNo} />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone mb-0.5">{t('checkout.accountName')}</p>
                      <p className="text-emerald-deep text-sm">{BANK_DETAILS.accountName}</p>
                    </div>
                    <CopyButton field="c-accountName" value={BANK_DETAILS.accountName} />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone mb-0.5">{t('checkout.bankName')}</p>
                      <p className="text-emerald-deep text-sm">{BANK_DETAILS.bankName}</p>
                    </div>
                    <CopyButton field="c-bankName" value={BANK_DETAILS.bankName} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-stone mb-0.5">{t('checkout.swift')}</p>
                        <p className="text-emerald-deep font-mono text-sm">{BANK_DETAILS.swift}</p>
                      </div>
                      <CopyButton field="c-swift" value={BANK_DETAILS.swift} />
                    </div>
                    <div>
                      <p className="text-xs text-stone mb-0.5">{t('checkout.sortCode')} / {t('checkout.branch')}</p>
                      <p className="text-emerald-deep font-mono text-sm">{BANK_DETAILS.sortCode} / {BANK_DETAILS.branch}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-stone mb-0.5">{t('checkout.bankAddress')}</p>
                    <p className="text-emerald-deep text-sm">{BANK_DETAILS.bankAddress}</p>
                  </div>
                  <div className="pt-2 border-t border-cream-dark">
                    <p className="text-xs text-gold mb-1">{t('checkout.paymentMemo')}</p>
                    <p className="text-emerald-deep text-sm font-medium">{BANK_DETAILS.memo}</p>
                  </div>
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
              <form ref={formRef} onSubmit={handleSubmit} className="bg-cream-dark/30 rounded-xl p-8 space-y-4">
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.yourName')}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.yourEmail')}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-stone mb-2">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-deep text-cream py-3 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  <span>{loading ? t('contact.sending') : t('contact.send')}</span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
