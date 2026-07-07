import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { t, i18n } = useTranslation();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const lang = i18n.language as 'zh' | 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border-light">
              <h2 className="font-serif text-xl text-primary">{t('cartDrawer.title')}</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-text-muted">
                  <ShoppingBag size={48} className="mb-4 opacity-40" />
                  <p className="font-medium">{t('cartDrawer.empty')}</p>
                  <p className="text-sm mt-1">{t('cartDrawer.emptyDesc')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <motion.div
                        layout
                        key={item.productId}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <Link to={`/products/${product.id}`} onClick={onClose}>
                          <img
                            src={product.images[0]}
                            alt={product.name[lang]}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link to={`/products/${product.id}`} onClick={onClose}>
                            <h4 className="font-medium text-text-primary line-clamp-2">{product.name[lang]}</h4>
                          </Link>
                          <p className="text-accent font-medium mt-1">¥{product.price}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-border-light rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-text-muted hover:text-error transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border-light p-6 space-y-4">
                <div className="flex justify-between text-text-secondary">
                  <span>{t('cartDrawer.subtotal')}</span>
                  <span>¥{totalPrice()}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>{t('cartDrawer.shipping')}</span>
                  <span className="text-success">{t('cartDrawer.freeShipping')}</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-primary pt-2">
                  <span>{t('cartDrawer.total')}</span>
                  <span className="text-accent font-bold">¥{totalPrice()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-primary text-white text-center py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-lg shadow-primary/25"
                >
                  {t('cartDrawer.checkout')}
                </Link>
                <button
                  onClick={clearCart}
                  className="block w-full text-text-secondary text-center py-2 text-sm hover:text-error transition-colors"
                >
                  {t('cartDrawer.clear')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
