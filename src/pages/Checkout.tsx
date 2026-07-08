import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Building2, Copy, CheckCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const BANK_DETAILS = {
  accountNo: '63007982843',
  accountName: 'SHENZHEN EXCELLENT VOYAGE INTERNATIONAL LOGISTIC CO.,LTD.',
  bankName: 'JPMorgan Chase Bank N.A. HK Branch',
  swift: 'CHASHKHHXXX',
  sortCode: '007',
  branch: '863',
  bankAddress: 'Chater House, 8 Connaught Road Central, Hong Kong',
  memo: 'Buyer Name + PI No. + Halal Herbal Tea Bags',
};

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const { items, totalPrice, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    payment: 'card',
  });

  if (items.length === 0 && !submitted) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-emerald-deep mb-4">{t('cart.empty')}</h1>
          <Link to="/products" className="text-gold hover:text-emerald-deep transition-colors">
            {t('cart.goShopping')}
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 bg-emerald-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-emerald-light" />
          </div>
          <h1 className="font-serif text-3xl text-emerald-deep mb-4">{t('checkout.success')}</h1>
          <p className="text-stone mb-6">{t('checkout.successDesc')}</p>
          <div className="bg-cream-dark/30 rounded-xl p-5 mb-8">
            <p className="text-xs text-stone mb-1">{t('checkout.orderNumber')}</p>
            <p className="text-2xl font-serif text-gold tracking-wider">{orderNumber}</p>
            <p className="text-xs text-stone mt-2">{t('checkout.orderNumberNote')}</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gold text-emerald-deep px-6 py-3 rounded-lg hover:bg-gold-light transition-colors"
          >
            <span>{t('checkout.continueShopping')}</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderNum = `SH${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    setOrderNumber(orderNum);
    
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        name: product?.name.en || '',
        price: product?.price || 0,
        quantity: item.quantity,
      };
    });
    
    const orderData = {
      order_number: orderNum,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_address: form.address,
      customer_city: form.city,
      payment_method: form.payment,
      items: orderItems,
      total: totalPrice(),
      status: 'pending',
    };
    
    // 本地存储一份
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([{ ...orderData, createdAt: new Date().toISOString() }, ...existingOrders]));
    
    setSubmitting(true);
    
    // 如果配置了 Supabase，写入云端数据库
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('orders').insert([orderData]);
        if (error) {
          console.error('Supabase insert error:', error);
        }
      } catch (err) {
        console.error('Supabase error:', err);
      }
    }
    
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => clearCart(), 50);
  };

  const paymentMethods = [
    { id: 'alipay', label: t('checkout.alipay'), icon: CreditCard },
    { id: 'wechat', label: t('checkout.wechat'), icon: CreditCard },
    { id: 'card', label: t('checkout.card'), icon: CreditCard },
    { id: 'bank', label: t('checkout.bankTransfer'), icon: Building2 },
  ];

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore
    }
  };

  const CopyButton = ({ field, value }: { field: string; value: string }) => (
    <button
      type="button"
      onClick={() => handleCopy(field, value)}
      className="p-1.5 rounded-lg hover:bg-cream-dark transition-colors text-stone hover:text-gold"
      title="Copy"
    >
      {copiedField === field ? <CheckCheck size={14} className="text-emerald-light" /> : <Copy size={14} />}
    </button>
  );

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-stone hover:text-emerald-deep transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>{t('checkout.backToCart')}</span>
        </Link>

        <h1 className="font-serif text-4xl text-emerald-deep mb-8">{t('checkout.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <ScrollReveal>
                <div className="bg-cream-dark/30 rounded-xl p-6">
                  <h2 className="font-serif text-xl text-emerald-deep mb-6">{t('checkout.shippingInfo')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-stone mb-2">{t('checkout.name')}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone mb-2">{t('checkout.phone')}</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-stone mb-2">{t('checkout.address')}</label>
                      <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone mb-2">{t('checkout.city')}</label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-cream-dark/30 rounded-xl p-6">
                  <h2 className="font-serif text-xl text-emerald-deep mb-6">{t('checkout.payment')}</h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <label
                          className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                            form.payment === method.id
                              ? 'border-gold bg-gold/5'
                              : 'border-cream-dark hover:border-stone-light'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={form.payment === method.id}
                            onChange={(e) => setForm({ ...form, payment: e.target.value })}
                            className="w-4 h-4 accent-gold"
                          />
                          <method.icon size={20} className="text-stone" />
                          <span className="text-emerald-deep">{method.label}</span>
                        </label>
                        <AnimatePresence>
                          {method.id === 'bank' && form.payment === 'bank' && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 ms-8 p-4 bg-cream rounded-lg border border-cream-dark space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs text-stone mb-0.5">{t('checkout.accountNo')}</p>
                                    <p className="text-emerald-deep font-mono text-sm font-medium">{BANK_DETAILS.accountNo}</p>
                                  </div>
                                  <CopyButton field="accountNo" value={BANK_DETAILS.accountNo} />
                                </div>
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs text-stone mb-0.5">{t('checkout.accountName')}</p>
                                    <p className="text-emerald-deep text-sm">{BANK_DETAILS.accountName}</p>
                                  </div>
                                  <CopyButton field="accountName" value={BANK_DETAILS.accountName} />
                                </div>
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs text-stone mb-0.5">{t('checkout.bankName')}</p>
                                    <p className="text-emerald-deep text-sm">{BANK_DETAILS.bankName}</p>
                                  </div>
                                  <CopyButton field="bankName" value={BANK_DETAILS.bankName} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="text-xs text-stone mb-0.5">{t('checkout.swift')}</p>
                                      <p className="text-emerald-deep font-mono text-sm">{BANK_DETAILS.swift}</p>
                                    </div>
                                    <CopyButton field="swift" value={BANK_DETAILS.swift} />
                                  </div>
                                  <div>
                                    <p className="text-xs text-stone mb-0.5">{t('checkout.sortCode')}</p>
                                    <p className="text-emerald-deep font-mono text-sm">{BANK_DETAILS.sortCode} | {BANK_DETAILS.branch}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-stone mb-0.5">{t('checkout.bankAddress')}</p>
                                  <p className="text-emerald-deep text-sm">{BANK_DETAILS.bankAddress}</p>
                                </div>
                                <div className="pt-2 border-t border-cream-dark">
                                  <p className="text-xs text-gold mb-1">{t('checkout.paymentMemo')}</p>
                                  <p className="text-emerald-deep text-sm font-medium">{BANK_DETAILS.memo}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-deep text-cream py-4 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? t('checkout.submitting') : `${t('checkout.confirmPay')} AED ${totalPrice()}`}
              </button>
            </form>
          </div>

          <ScrollReveal>
            <div className="bg-cream-dark/30 rounded-xl p-6 h-fit sticky top-28">
              <h2 className="font-serif text-xl text-emerald-deep mb-6">{t('checkout.orderDetails')}</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name[lang]}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-emerald-deep text-sm">{product.name[lang]}</p>
                        <p className="text-stone text-xs">x{item.quantity}</p>
                      </div>
                      <span className="text-emerald-deep text-sm">
                        AED {product.price * item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-cream-dark pt-4 space-y-2">
                <div className="flex justify-between text-stone text-sm">
                  <span>{t('checkout.subtotal')}</span>
                  <span>AED {totalPrice()}</span>
                </div>
                <div className="flex justify-between text-stone text-sm">
                  <span>{t('checkout.shipping')}</span>
                  <span className="text-emerald-light">{t('checkout.freeShipping')}</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-emerald-deep pt-2">
                  <span>{t('checkout.total')}</span>
                  <span className="text-gold">AED {totalPrice()}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
