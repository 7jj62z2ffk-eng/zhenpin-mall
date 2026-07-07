import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { products, reviews, categories } from '../data/products';

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'zh' | 'en';
  const featuredProducts = products.slice(0, 4);
  const newProducts = products.slice(4, 8);
  const displayCategories = categories.slice(1, 5);

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519681393798-ef1a04f6e42e?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-accent tracking-[0.3em] text-sm uppercase font-medium mb-6"
          >
            {t('home.heroSubtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight"
          >
            {t('home.heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
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
              className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-xl hover:bg-accent-light transition-all duration-300 font-medium shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              <span>{t('home.explore')}</span>
              <ArrowRight size={18} />
            </Link>
            <button className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-10 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-medium backdrop-blur-sm">
              <Play size={18} className="fill-white" />
              <span>{t('home.learnMore')}</span>
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs tracking-widest uppercase">{t('home.explore')}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-center text-primary mb-4">{t('home.categories')}</h2>
            <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">{t('home.categoriesDesc')}</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayCategories.map((cat, i) => (
              <ScrollReveal key={cat.en} delay={i * 0.1}>
                <Link
                  to={`/products?category=${cat.en}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 hover:bg-gray-200 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <span className="font-serif text-xl text-primary group-hover:text-accent transition-colors">{cat[lang]}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">{t('home.featured')}</h2>
                <p className="text-text-secondary">{t('home.featuredDesc')}</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium group">
                <span>{t('home.viewAll')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">{t('home.newArrivals')}</h2>
                <p className="text-text-secondary">{t('home.newArrivalsDesc')}</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium group">
                <span>{t('home.viewAll')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
                    alt="Brand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/10 rounded-3xl -z-10" />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-3xl -z-10" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-accent tracking-widest text-sm uppercase font-medium mb-4">{t('home.brandStory')}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6 leading-tight">{t('home.brandTitle')}</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('home.brandDesc1')}
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                {t('home.brandDesc2')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium group"
              >
                <span>{t('home.learnMore')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-center text-primary mb-4">{t('home.reviews')}</h2>
            <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">{t('home.reviewsDesc')}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-500">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={j < review.rating ? 'fill-accent text-accent' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <Quote size={20} className="text-accent/30 mb-3" />
                  <p className="text-text-primary text-sm leading-relaxed mb-6">{review.comment[lang]}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <span className="font-serif text-accent text-sm">{review.name[lang][0]}</span>
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-medium">{review.name[lang]}</p>
                      <p className="text-text-muted text-xs">{review.date}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{t('home.heroTitle')}</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{t('home.heroDesc')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              <span>{t('home.learnMore')}</span>
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
