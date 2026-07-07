import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';

export default function Cart() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'zh' | 'en';
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl text-charcoal mb-8">{t('cart.title')}</h1>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <ShoppingBag size={64} className="mx-auto mb-6 text-stone-light/40" />
              <h2 className="font-serif text-xl text-charcoal mb-2">{t('cart.empty')}</h2>
              <p className="text-stone mb-6">{t('cart.emptyDesc')}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded hover:bg-gold-light transition-colors"
              >
                <span>{t('cart.goShopping')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <motion.div
                    layout
                    key={item.productId}
                    className="flex gap-6 p-6 bg-cream-dark/20 rounded-lg"
                  >
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-serif text-lg text-charcoal">{product.name[lang]}</h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-stone hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gold font-medium mb-4">¥{product.price}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-cream-dark rounded">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-cream-dark transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="ml-auto text-charcoal font-medium">
                          ¥{product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <button
                onClick={clearCart}
                className="text-stone text-sm hover:text-red-500 transition-colors"
              >
                {t('cart.clear')}
              </button>
            </div>

            <ScrollReveal>
              <div className="bg-cream-dark/20 rounded-lg p-6 h-fit sticky top-28">
                <h2 className="font-serif text-xl text-charcoal mb-6">{t('cart.summary')}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-stone">
                    <span>{t('cart.subtotal')}</span>
                    <span>¥{totalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-stone">
                    <span>{t('cart.shipping')}</span>
                    <span>{t('cart.freeShipping')}</span>
                  </div>
                  <div className="border-t border-cream-dark pt-3 flex justify-between font-serif text-lg text-charcoal">
                    <span>{t('cart.total')}</span>
                    <span className="text-gold">¥{totalPrice()}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-charcoal text-cream text-center py-3 rounded hover:bg-gold transition-colors"
                >
                  {t('cart.checkout')}
                </Link>
                <Link
                  to="/products"
                  className="block w-full text-center text-stone py-3 text-sm hover:text-charcoal transition-colors"
                >
                  {t('cart.continueShopping')}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
