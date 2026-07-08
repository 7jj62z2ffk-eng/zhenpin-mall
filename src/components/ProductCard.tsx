import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useCartStore } from '../stores/cartStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const lang = i18n.language as 'en' | 'ar';

  const hasSaleTag = product.originalPrice !== undefined;
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <motion.img
          src={product.images[0]}
          alt={product.name[lang]}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {hasSaleTag && (
          <span className="absolute top-3 left-3 bg-gold text-cream text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {product.isOrganic && (
          <span className="absolute top-3 right-3 bg-emerald-dark text-cream text-xs font-medium px-2 py-1 rounded">
            {t('productCard.organic')}
          </span>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-gold text-cream' 
              : 'bg-cream/80 backdrop-blur-sm text-stone hover:text-gold'
          }`}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 right-3 flex gap-2"
        >
          <button
            onClick={() => addItem(product.id)}
            className="flex-1 bg-emerald-deep text-cream py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gold hover:text-emerald-deep transition-colors font-medium"
          >
            <ShoppingBag size={14} />
            <span className="text-sm">{t('productCard.addToCart')}</span>
          </button>
          <Link
            to={`/products/${product.id}`}
            className="bg-cream text-emerald-deep p-2.5 rounded-lg hover:bg-cream-dark transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </motion.div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-stone text-xs font-medium uppercase tracking-wider">{product.category[lang]}</p>
          {product.isHalal && (
            <span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-medium">{t('productCard.halal')}</span>
          )}
        </div>
        <h3 className="font-serif text-base text-emerald-deep mb-2 line-clamp-2 group-hover:text-gold transition-colors">
          {product.name[lang]}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gold">AED {product.price}</span>
            {product.originalPrice && (
              <span className="text-stone-light line-through text-sm">AED {product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-stone text-xs">
            <Star size={12} className="fill-gold text-gold" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
