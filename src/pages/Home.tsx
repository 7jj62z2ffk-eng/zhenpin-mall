import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote, Leaf, Droplets, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { products, reviews, categories } from '../data/products';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const featuredProducts = products.slice(0, 4);
  const newProducts = products.slice(4, 8);
  const displayCategories = categories.slice(1, 6);

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://neeko-copilot.bytedance.net/api/text2image?prompt=luxury%20wellness%20tea%20golden%20saffron%20moroccan%20style%20interior%20warm%20lighting%20green%20gold%20aesthetic&image_size=landscape_16_9"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/70 via-emerald-deep/50 to-emerald-deep/65" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-light/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 bg-gold/20 text-gold text-sm rounded-full font-medium border border-gold/30">
              {t('home.halalBadge')}
            </span>
            <span className="px-4 py-1.5 bg-cream/10 text-cream text-sm rounded-full font-medium border border-cream/20">
              {t('home.caffeineFreeBadge')}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gold tracking-[0.3em] text-sm uppercase font-medium mb-6"
          >
            {t('home.heroSubtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight"
          >
            {t('home.heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-cream/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t('home.heroDesc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gold text-emerald-deep px-8 py-3.5 rounded-lg hover:bg-gold-light transition-all duration-300 font-medium"
            >
              <span>{t('home.explore')}</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream px-8 py-3.5 rounded-lg hover:bg-cream/10 hover:border-cream/50 transition-all duration-300 font-medium backdrop-blur-sm"
            >
              <span>{t('home.learnMore')}</span>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-cream/60">
            <span className="text-xs tracking-widest uppercase">{t('home.explore')}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-cream/60 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6 bg-emerald-deep">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: t('home.halalBadge'), desc: t('home.halalDesc') },
              { icon: Droplets, title: t('home.caffeineFreeBadge'), desc: t('home.caffeineFreeDesc') },
              { icon: Moon, title: t('home.organicBadge'), desc: t('home.organicDesc') },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream">{item.title}</h3>
                  <p className="text-cream/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-center text-emerald-deep mb-3">{t('home.categories')}</h2>
            <p className="text-stone text-center mb-14 max-w-xl mx-auto">{t('home.categoriesDesc')}</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayCategories.map((cat, i) => (
              <ScrollReveal key={cat.en} delay={i * 0.1}>
                <Link
                  to={`/products?category=${cat.en}`}
                  className="group block relative overflow-hidden rounded-xl aspect-[4/5] bg-cream-dark hover:bg-emerald-deep transition-all duration-500"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                      <Leaf size={20} className="text-gold" />
                    </div>
                    <span className="font-serif text-base text-emerald-deep group-hover:text-cream transition-colors text-center">{cat[lang]}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-emerald-deep mb-2">{t('home.featured')}</h2>
                <p className="text-stone">{t('home.featuredDesc')}</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-gold-dark hover:text-emerald-deep transition-colors font-medium group">
                <span>{t('home.viewAll')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-emerald-deep mb-2">{t('home.newArrivals')}</h2>
                <p className="text-stone">{t('home.newArrivalsDesc')}</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-gold-dark hover:text-emerald-deep transition-colors font-medium group">
                <span>{t('home.viewAll')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream-dark/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://neeko-copilot.bytedance.net/api/text2image?prompt=artisan%20tea%20blending%20middle%20eastern%20spices%20saffron%20cinnamon%20warm%20golden%20light%20craftsmanship&image_size=landscape_4_3"
                    alt="Brand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gold/10 rounded-xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-deep/5 rounded-xl -z-10" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gold tracking-widest text-sm uppercase font-medium mb-4">{t('home.brandStory')}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-emerald-deep mb-5 leading-tight">{t('home.brandTitle')}</h2>
              <p className="text-stone leading-relaxed mb-5">
                {t('home.brandDesc1')}
              </p>
              <p className="text-stone leading-relaxed mb-7">
                {t('home.brandDesc2')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-gold-dark hover:text-emerald-deep transition-colors font-medium group"
              >
                <span>{t('home.learnMore')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-center text-emerald-deep mb-3">{t('home.reviews')}</h2>
            <p className="text-stone text-center mb-14 max-w-xl mx-auto">{t('home.reviewsDesc')}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.1}>
                <div className="bg-cream rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-500">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j < review.rating ? 'fill-gold text-gold' : 'text-cream-dark'}
                      />
                    ))}
                  </div>
                  <Quote size={16} className="text-gold/30 mb-2" />
                  <p className="text-emerald-deep text-sm leading-relaxed mb-5">{review.comment[lang]}</p>
                  <div className="flex items-center gap-2">
                    <img src={review.avatar} alt={review.name[lang]} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-emerald-deep text-xs font-medium">{review.name[lang]}</p>
                      <p className="text-stone text-xs">{review.date}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gold/15 border-y border-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-emerald-deep mb-5">{t('home.heroTitle')}</h2>
            <p className="text-stone text-base mb-8 max-w-xl mx-auto">{t('home.heroDesc')}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-emerald-deep text-cream px-8 py-3.5 rounded-lg hover:bg-emerald-dark transition-all duration-300 font-medium"
            >
              <span>{t('home.explore')}</span>
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
