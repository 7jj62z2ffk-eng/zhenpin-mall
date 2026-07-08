import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import { Shield, Leaf, Truck } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const features = [
    { icon: Shield, title: t('about.strict'), desc: t('about.strictDesc') },
    { icon: Leaf, title: t('about.craft'), desc: t('about.craftDesc') },
    { icon: Truck, title: t('about.service'), desc: t('about.serviceDesc') },
  ];

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl text-emerald-deep mb-4 text-center">{t('about.title')}</h1>
          <p className="text-stone text-center mb-16">{t('about.subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <img
              src="https://neeko-copilot.bytedance.net/api/text2image?prompt=middle%20eastern%20tea%20artisan%20craftsmanship%20saffron%20spices%20warm%20golden%20light%20luxury%20heritage&image_size=landscape_16_9"
              alt="About"
              className="w-full h-72 object-cover rounded-xl mb-8"
            />
            <h2 className="font-serif text-2xl text-emerald-deep mb-4">{t('about.philosophy')}</h2>
            <p className="text-stone leading-relaxed mb-4">
              {t('about.philosophyDesc1')}
            </p>
            <p className="text-stone leading-relaxed">
              {t('about.philosophyDesc2')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((item) => (
              <div key={item.title} className="text-center p-6 bg-cream-dark/30 rounded-xl">
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl text-emerald-deep mb-3">{item.title}</h3>
                <p className="text-stone text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <h2 className="font-serif text-2xl text-emerald-deep mb-6">{t('about.story')}</h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
              <p>{t('about.story3')}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
