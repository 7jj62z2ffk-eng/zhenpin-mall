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
  const lang = i18n.language as 'zh' | 'en';

  const hasSaleTag = product.originalPrice !== undefined;
  const hasLimitedTag = product.tags.some(tag => tag.zh === '限量' || tag.en === 'Limited');
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <motion.img
          src={product.images[0]}
          alt={product.name[lang]}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {hasSaleTag && (
          <span className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-3 py-1.5 rounded-full">
            -{discount}%
          </span>
        )}
        {hasLimitedTag && (
          <span className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {t('productCard.limited')}
          </span>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-error text-white' 
              : 'bg-white/80 backdrop-blur-sm text-text-secondary hover:text-error'
          }`}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4 flex gap-3"
        >
          <button
            onClick={() => addItem(product.id)}
            className="flex-1 bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors font-medium"
          >
            <ShoppingBag size={16} />
            <span>{t('productCard.addToCart')}</span>
          </button>
          <Link
            to={`/products/${product.id}`}
            className="bg-white text-primary p-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </motion.div>
      </div>
      <div className="p-5">
        <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-2">{product.category[lang]}</p>
        <h3 className="font-serif text-lg text-text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {product.name[lang]}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-accent">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-text-muted line-through text-sm">¥{product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-text-muted text-sm">
            <Star size={12} className="fill-accent text-accent" />
            <span>{product.rating}</span>
            <span className="text-text-muted/60">({product.reviews})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
