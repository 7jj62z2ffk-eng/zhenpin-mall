import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Check, Leaf, Droplets, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-emerald-deep mb-4">{t('productDetail.notFound')}</h1>
          <Link to="/products" className="text-gold hover:text-emerald-deep transition-colors">
            {t('productDetail.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category.en === product.category.en && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-stone hover:text-emerald-deep transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>{t('productDetail.backToList')}</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <ScrollReveal>
            <div className="rounded-xl overflow-hidden bg-cream-dark/50 aspect-square">
              <img
                src={product.images[0]}
                alt={product.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product.isHalal && (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold text-xs rounded-full font-medium">
                  <Shield size={12} /> {t('productDetail.halalCertified')}
                </span>
              )}
              {product.isOrganic && (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald-dark/10 text-emerald-dark text-xs rounded-full font-medium">
                  <Leaf size={12} /> {t('productDetail.organic')}
                </span>
              )}
              <span className="flex items-center gap-1 px-3 py-1.5 bg-cream-dark text-stone text-xs rounded-full font-medium">
                <Droplets size={12} /> {t('productDetail.caffeineFree')}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-stone text-sm mb-2">{product.category[lang]}</p>
              <h1 className="font-serif text-3xl md:text-4xl text-emerald-deep mb-4">{product.name[lang]}</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-cream-dark'}
                    />
                  ))}
                </div>
                <span className="text-stone text-sm">{product.rating} ({product.reviews} {t('productDetail.reviews')})</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl text-gold font-medium">AED {product.price}</span>
                {product.originalPrice && (
                  <span className="text-stone-light line-through text-lg">AED {product.originalPrice}</span>
                )}
              </div>

              <p className="text-stone leading-relaxed mb-8">{product.description[lang]}</p>

              <div className="border-t border-cream-dark pt-8 mb-8">
                <h3 className="font-serif text-lg text-emerald-deep mb-4">{t('productDetail.ingredients')}</h3>
                <p className="text-stone text-sm">{product.ingredients[lang]}</p>
              </div>

              <div className="border-t border-cream-dark pt-8 mb-8">
                <h3 className="font-serif text-lg text-emerald-deep mb-4">{t('productDetail.benefits')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit) => (
                    <span key={benefit} className="px-3 py-1.5 bg-emerald-deep/5 text-emerald-deep text-sm rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-cream-dark pt-8 mb-8">
                <h3 className="font-serif text-lg text-emerald-deep mb-4">{t('productDetail.brewMethod')}</h3>
                <p className="text-stone text-sm leading-relaxed">{product.brewMethod[lang]}</p>
              </div>

              <div className="border-t border-cream-dark pt-8 mb-8">
                <h3 className="font-serif text-lg text-emerald-deep mb-4">{t('productDetail.specs')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec) => (
                    <div key={spec.key.en} className="flex justify-between py-2 border-b border-cream-dark/50">
                      <span className="text-stone text-sm">{spec.key[lang]}</span>
                      <span className="text-emerald-deep text-sm font-medium">{spec.value[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center border border-cream-dark rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-cream-dark transition-colors text-emerald-deep"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-emerald-deep">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-cream-dark transition-colors text-emerald-deep"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors font-medium ${
                    added
                      ? 'bg-emerald-light text-cream'
                      : 'bg-emerald-deep text-cream hover:bg-gold hover:text-emerald-deep'
                  }`}
                >
                  {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                  <span>{added ? t('productDetail.added') : t('productDetail.addToCart')}</span>
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag.en} className="px-3 py-1 bg-cream-dark/50 text-stone text-xs rounded-full">
                    {tag[lang]}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <ScrollReveal>
              <h2 className="font-serif text-2xl text-emerald-deep mb-8">{t('productDetail.related')}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
