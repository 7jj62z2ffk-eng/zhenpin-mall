import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  Phone,
  Copy,
  CheckCheck,
  Trash2,
  EyeOff,
  Lock,
  RefreshCw,
  Cloud,
  HardDrive,
  Download,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// 管理员密码 —— 建议部署时修改为强密码
const ADMIN_PASSWORD = 'admin123';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id?: string;
  order_number: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  payment_method: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export default function Admin() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'local' | 'supabase'>('local');

  useEffect(() => {
    const logged = sessionStorage.getItem('admin_logged_in');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    setLoading(true);

    // 优先从 Supabase 拉取
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (data) {
          setOrders(data as Order[]);
          setDataSource('supabase');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Supabase error:', err);
      }
    }

    // 回退到本地存储
    const stored = localStorage.getItem('orders');
    if (stored) {
      const localOrders = JSON.parse(stored).map((o: any) => ({
        order_number: o.order_number || o.orderNumber,
        created_at: o.created_at || o.createdAt,
        customer_name: o.customer_name || o.customer?.name,
        customer_phone: o.customer_phone || o.customer?.phone,
        customer_address: o.customer_address || o.customer?.address,
        customer_city: o.customer_city || o.customer?.city,
        payment_method: o.payment_method || o.paymentMethod,
        items: o.items || [],
        total: o.total || 0,
        status: o.status || 'pending',
      }));
      setOrders(localOrders);
    }
    setDataSource('local');
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    setOrders([]);
    setSelectedOrder(null);
    setPassword('');
  };

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!confirm(t('admin.confirmDelete'))) return;

    // 如果是 Supabase 数据，删除云端记录
    if (dataSource === 'supabase' && order.id && isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('orders').delete().eq('id', order.id);
        if (error) {
          console.error('Delete error:', error);
          alert('Failed to delete from cloud');
          return;
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    }

    const updated = orders.filter((o) => o.order_number !== order.order_number);
    setOrders(updated);
    if (selectedOrder?.order_number === order.order_number) {
      setSelectedOrder(null);
    }

    // 同时更新本地存储
    const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const filteredLocal = localOrders.filter(
      (o: any) => (o.order_number || o.orderNumber) !== order.order_number
    );
    localStorage.setItem('orders', JSON.stringify(filteredLocal));
  };

  const handleClearAll = async () => {
    if (!confirm(t('admin.confirmClearAll'))) return;

    if (dataSource === 'supabase' && isSupabaseConfigured()) {
      const orderIds = orders.map((o) => o.id).filter(Boolean);
      if (orderIds.length > 0) {
        try {
          const { error } = await supabase.from('orders').delete().in('id', orderIds);
          if (error) {
            console.error('Clear all error:', error);
            alert('Failed to clear cloud orders');
            return;
          }
        } catch (err) {
          console.error('Clear all error:', err);
        }
      }
    }

    setOrders([]);
    setSelectedOrder(null);
    localStorage.removeItem('orders');
  };

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'City', 'Address', 'Payment', 'Total', 'Items'];
    const rows = orders.map((order) => [
      order.order_number,
      formatDate(order.created_at),
      order.customer_name,
      order.customer_phone,
      order.customer_city,
      order.customer_address,
      getPaymentLabel(order.payment_method),
      `AED ${order.total}`,
      order.items.map((i) => `${i.name} x${i.quantity}`).join('; '),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      pending: { text: 'Pending', color: 'bg-amber-100 text-amber-700' },
      paid: { text: 'Paid', color: 'bg-emerald-100 text-emerald-700' },
      shipped: { text: 'Shipped', color: 'bg-blue-100 text-blue-700' },
      cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-700' },
    };
    return labels[status] || { text: status, color: 'bg-stone-100 text-stone-700' };
  };

  // 登录页面
  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-16 px-6 min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-cream-dark/30 rounded-2xl p-8 border border-cream-dark">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-gold" />
            </div>
            <h1 className="font-serif text-2xl text-emerald-deep text-center mb-2">
              {t('admin.title')}
            </h1>
            <p className="text-stone text-center text-sm mb-6">
              {t('admin.loginDesc')}
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder={t('admin.password')}
                  className="w-full px-4 py-3 border border-cream-dark rounded-lg bg-cream text-emerald-deep placeholder:text-stone/50 focus:outline-none focus:border-gold"
                />
              </div>
              {loginError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {t('admin.wrongPassword')}
                </motion.p>
              )}
              <button
                type="submit"
                className="w-full bg-emerald-deep text-cream py-3 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors font-medium"
              >
                {t('admin.login')}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-stone hover:text-emerald-deep transition-colors">
                ← {t('admin.backToSite')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
          <button
            onClick={handleLogout}
            className="text-sm text-stone hover:text-red-500 transition-colors"
          >
            {t('admin.logout')}
          </button>
        </div>

        <div className="bg-cream-dark/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t('admin.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-cream-dark rounded-lg bg-cream text-emerald-deep placeholder:text-stone/50 focus:outline-none focus:border-gold"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone">🔍</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="p-3 rounded-lg border border-cream-dark hover:border-gold transition-colors text-stone hover:text-gold disabled:opacity-50"
                title={t('admin.refresh')}
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleExportCSV}
                disabled={orders.length === 0}
                className="p-3 rounded-lg border border-cream-dark hover:border-gold transition-colors text-stone hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed"
                title="Export CSV"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-stone">
            <div className="flex items-center gap-4">
              <span>{t('admin.totalOrders', { count: orders.length })}</span>
              <span className="flex items-center gap-1">
                {dataSource === 'supabase' ? (
                  <>
                    <Cloud size={14} className="text-emerald-light" />
                    {t('admin.cloudData')}
                  </>
                ) : (
                  <>
                    <HardDrive size={14} />
                    {t('admin.localData')}
                  </>
                )}
              </span>
            </div>
            {orders.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} />
                {t('admin.clearAll')}
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <RefreshCw size={32} className="text-gold/50 mx-auto mb-4 animate-spin" />
            <p className="text-stone">{t('admin.loading')}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="text-stone/30 mx-auto mb-4" />
            <p className="text-stone">{t('admin.noOrders')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filteredOrders.map((order, index) => {
                const statusInfo = getStatusLabel(order.status);
                return (
                  <motion.div
                    key={order.order_number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-cream-dark/30 rounded-xl p-5 border border-cream-dark hover:border-gold/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-stone uppercase tracking-wider">
                            {t('admin.order')}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                        <p className="text-xl font-serif text-gold">{order.order_number}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(`order-${order.order_number}`, order.order_number);
                          }}
                          className="p-2 rounded-lg hover:bg-cream-dark transition-colors text-stone hover:text-gold"
                        >
                          {copiedField === `order-${order.order_number}` ? (
                            <CheckCheck size={16} className="text-emerald-light" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(order);
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
                        <p className="text-emerald-deep truncate">{order.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone mb-1">{t('checkout.city')}</p>
                        <p className="text-emerald-deep truncate">{order.customer_city || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone mb-1">{t('checkout.payment')}</p>
                        <p className="text-emerald-deep">{getPaymentLabel(order.payment_method)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone mb-1">{t('checkout.total')}</p>
                        <p className="text-gold font-medium">AED {order.total}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-stone">
                      <Calendar size={12} />
                      <span>{formatDate(order.created_at)}</span>
                    </div>
                  </motion.div>
                );
              })}
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
                        <span className="text-lg font-serif text-gold">{selectedOrder.order_number}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone">
                        <Calendar size={14} />
                        <span>{formatDate(selectedOrder.created_at)}</span>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <h3 className="font-serif text-sm text-emerald-deep mb-3">
                          {t('admin.customerInfo')}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gold font-medium">
                                {selectedOrder.customer_name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-emerald-deep">{selectedOrder.customer_name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone size={14} className="text-stone" />
                            <span className="text-emerald-deep">{selectedOrder.customer_phone}</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin size={14} className="text-stone mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-emerald-deep">{selectedOrder.customer_address}</p>
                              <p className="text-stone text-sm">{selectedOrder.customer_city}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <h3 className="font-serif text-sm text-emerald-deep mb-3">{t('admin.items')}</h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div>
                                <p className="text-emerald-deep text-sm">{item.name}</p>
                                <p className="text-stone text-xs">x{item.quantity}</p>
                              </div>
                              <span className="text-emerald-deep text-sm">
                                AED {(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-stone">{t('checkout.payment')}</span>
                          <span className="text-emerald-deep">
                            {getPaymentLabel(selectedOrder.payment_method)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg text-emerald-deep">{t('checkout.total')}</span>
                          <span className="text-xl font-serif text-gold">AED {selectedOrder.total}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-cream-dark">
                        <button
                          onClick={() => {
                            const details = [
                              `Order: ${selectedOrder.order_number}`,
                              `Name: ${selectedOrder.customer_name}`,
                              `Phone: ${selectedOrder.customer_phone}`,
                              `City: ${selectedOrder.customer_city}`,
                              `Address: ${selectedOrder.customer_address}`,
                              `Payment: ${getPaymentLabel(selectedOrder.payment_method)}`,
                              `Total: AED ${selectedOrder.total}`,
                              '',
                              'Items:',
                              ...selectedOrder.items.map(
                                (i) => `  - ${i.name} x${i.quantity} = AED ${(i.price * i.quantity).toFixed(2)}`
                              ),
                              '',
                              `Date: ${formatDate(selectedOrder.created_at)}`,
                            ].join('\n');
                            handleCopy(`details-${selectedOrder.order_number}`, details);
                          }}
                          className="w-full bg-emerald-deep text-cream py-2.5 rounded-lg hover:bg-gold hover:text-emerald-deep transition-colors flex items-center justify-center gap-2"
                        >
                          {copiedField === `details-${selectedOrder.order_number}` ? (
                            <>
                              <CheckCheck size={16} /> {t('admin.copied')}
                            </>
                          ) : (
                            <>
                              <Copy size={16} /> {t('admin.copyDetails')}
                            </>
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
