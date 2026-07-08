import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, MapPin, Phone, Copy, CheckCheck, Trash2, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderNumber: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  total: number;
}

export default function Admin() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDeleteOrder = (orderNumber: string) => {
    if (!confirm(t('admin.confirmDelete'))) return;
    const updated = orders.filter(o => o.orderNumber !== orderNumber);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    if (selectedOrder?.orderNumber === orderNumber) {
      setSelectedOrder(null);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      alipay: t('checkout.alipay'),
      wechat: t('checkout.wechat'),
      card: t('checkout.card'),
      bank: t('checkout.bankTransfer'),
    };
    return labels[method] || method;
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone hover:text-emerald-deep transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{t('admin.backToSite')}</span>
          </Link>
          <h1 className="font-serif text-3xl text-emerald-deep">{t('admin.title')}</h1>
          <div className="w-32"></div>
        </div>

        <div className="bg-cream-dark/30 rounded-xl p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('admin.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-cream-dark rounded-lg bg-cream text-emerald-deep placeholder:text-stone/50 focus:outline-none focus:border-gold"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone">🔍</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-stone">
            <span>{t('admin.totalOrders', { count: orders.length })}</span>
            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (!confirm(t('admin.confirmClearAll'))) return;
                  localStorage.removeItem('orders');
                  setOrders([]);
                }}
                className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} />
                {t('admin.clearAll')}
              </button>
            )}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="text-stone/30 mx-auto mb-4" />
            <p className="text-stone">{t('admin.noOrders')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.orderNumber}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-cream-dark/30 rounded-xl p-5 border border-cream-dark hover:border-gold/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-stone uppercase tracking-wider">{t('admin.order')}</span>
                      <p className="text-xl font-serif text-gold">{order.orderNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(`order-${order.orderNumber}`, order.orderNumber);
                        }}
                        className="p-2 rounded-lg hover:bg-cream-dark transition-colors text-stone hover:text-gold"
                      >
                        {copiedField === `order-${order.orderNumber}` ? (
                          <CheckCheck size={16} className="text-emerald-light" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOrder(order.orderNumber);
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-stone hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-stone mb-1">{t('checkout.name')}</p>
                      <p className="text-emerald-deep truncate">{order.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone mb-1">{t('checkout.city')}</p>
                      <p className="text-emerald-deep truncate">{order.customer.city}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone mb-1">{t('checkout.payment')}</p>
                      <p className="text-emerald-deep">{getPaymentLabel(order.paymentMethod)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone mb-1">{t('checkout.total')}</p>
                      <p className="text-gold font-medium">AED {order.total}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-stone">
                    <Calendar size={12} />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {selectedOrder && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-28 bg-cream-dark/30 rounded-xl p-6 border border-cream-dark">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl text-emerald-deep">{t('admin.orderDetails')}</h2>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="p-2 rounded-lg hover:bg-cream-dark transition-colors text-stone"
                      >
                        <EyeOff size={16} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone">{t('admin.order')}</span>
                        <span className="text-lg font-serif text-gold">{selectedOrder.orderNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone">
                        <Calendar size={14} />
                        <span>{formatDate(selectedOrder.createdAt)}</span>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <h3 className="font-serif text-sm text-emerald-deep mb-3">{t('admin.customerInfo')}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gold font-medium">
                                {selectedOrder.customer.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-emerald-deep">{selectedOrder.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone size={14} className="text-stone" />
                            <span className="text-emerald-deep">{selectedOrder.customer.phone}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin size={14} className="text-stone mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-emerald-deep">{selectedOrder.customer.address}</p>
                              <p className="text-stone text-sm">{selectedOrder.customer.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <h3 className="font-serif text-sm text-emerald-deep mb-3">{t('admin.items')}</h3>
                        <div className="space-y-3">
                          {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div>
                                <p className="text-emerald-deep text-sm">{item.name}</p>
                                <p className="text-stone text-xs">x{item.quantity}</p>
                              </div>
                              <span className="text-emerald-deep text-sm">AED {item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-stone">{t('checkout.payment')}</span>
                          <span className="text-emerald-deep">{getPaymentLabel(selectedOrder.paymentMethod)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg text-emerald-deep">{t('checkout.total')}</span>
                          <span className="text-xl font-serif text-gold">AED {selectedOrder.total}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <button
                          onClick={() => {
                            const details = `Order: ${selectedOrder.orderNumber}\nName: ${selectedOrder.customer.name}\nPhone: ${selectedOrder.customer.phone}\nCity: ${selectedOrder.customer.city}\nAddress: ${selectedOrder.customer.address}\nPayment: ${getPaymentLabel(selectedOrder.paymentMethod)}\nTotal: AED ${selectedOrder.total}\n\nItems:\n${selectedOrder.items.map(i => `  - ${i.name} x${i.quantity} = AED ${i.price * i.quantity}`).join('\n')}\n\nDate: ${formatDate(selectedOrder.createdAt)}`;
                            handleCopy(`details-${selectedOrder.orderNumber}`, details);
                          }}
                          className="w-full bg-emerald-deep text-cream py-2.5 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors flex items-center justify-center gap-2"
                        >
                          {copiedField === `details-${selectedOrder.orderNumber}` ? (
                            <><CheckCheck size={16} /> {t('admin.copied')}</>
                          ) : (
                            <><Copy size={16} /> {t('admin.copyDetails')}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}