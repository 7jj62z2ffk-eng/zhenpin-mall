import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  const { t } = useTranslation();

  const features = [
    { title: t('about.strict'), desc: t('about.strictDesc') },
    { title: t('about.craft'), desc: t('about.craftDesc') },
    { title: t('about.service'), desc: t('about.serviceDesc') },
  ];

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl text-charcoal mb-4 text-center">{t('about.title')}</h1>
          <p className="text-stone text-center mb-16">{t('about.subtitle')}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop"
              alt="About"
              className="w-full h-72 object-cover rounded-lg mb-8"
            />
            <h2 className="font-serif text-2xl text-charcoal mb-4">{t('about.philosophy')}</h2>
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
              <div key={item.title} className="text-center p-6 bg-cream-dark/20 rounded-lg">
                <h3 className="font-serif text-xl text-charcoal mb-3">{item.title}</h3>
                <p className="text-stone text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <h2 className="font-serif text-2xl text-charcoal mb-6">{t('about.story')}</h2>
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
