import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'zh' | 'en';
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-charcoal mb-4">{t('productDetail.notFound')}</h1>
          <Link to="/products" className="text-gold hover:text-charcoal transition-colors">
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
    <div className="pt-24 pb-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-stone hover:text-charcoal transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>{t('productDetail.backToList')}</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <ScrollReveal>
            <div className="rounded-lg overflow-hidden bg-cream-dark/30 aspect-square">
              <img
                src={product.images[0]}
                alt={product.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-stone text-sm mb-2">{product.category[lang]}</p>
              <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">{product.name[lang]}</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-stone-light'}
                    />
                  ))}
                </div>
                <span className="text-stone text-sm">{product.rating} ({product.reviews} {t('productDetail.reviews')})</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl text-gold font-medium">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-stone-light line-through text-lg">¥{product.originalPrice}</span>
                )}
              </div>

              <p className="text-stone leading-relaxed mb-8">{product.description[lang]}</p>

              <div className="border-t border-cream-dark pt-8 mb-8">
                <h3 className="font-serif text-lg text-charcoal mb-4">{t('productDetail.specs')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec) => (
                    <div key={spec.key.en} className="flex justify-between py-2 border-b border-cream-dark/50">
                      <span className="text-stone text-sm">{spec.key[lang]}</span>
                      <span className="text-charcoal text-sm">{spec.value[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center border border-cream-dark rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-cream-dark transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-cream-dark transition-colors"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded transition-colors ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-charcoal text-cream hover:bg-gold'
                  }`}
                >
                  {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                  <span>{added ? t('productDetail.added') : t('productDetail.addToCart')}</span>
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag.en} className="px-3 py-1 bg-cream-dark/50 text-stone text-xs rounded">
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
              <h2 className="font-serif text-2xl text-charcoal mb-8">{t('productDetail.related')}</h2>
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
