import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Leaf, Flame, Heart, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Products() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'ar';
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'all' || selectedCategory === 'الكل'
      ? products
      : products.filter((p) => p.category.en === selectedCategory || p.category.ar === selectedCategory);

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (cat: { en: string; ar: string }) => {
    const catKey = cat.en === 'All' ? 'all' : cat.en;
    setSelectedCategory(catKey);
    if (catKey === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catKey);
    }
    setSearchParams(searchParams);
  };

  const isCategorySelected = (cat: { en: string; ar: string }) => {
    const catKey = cat.en === 'All' ? 'all' : cat.en;
    return selectedCategory === catKey || selectedCategory === cat.ar;
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'All': <Leaf size={14} />,
    'الكل': <Leaf size={14} />,
    'Middle Eastern Classics': <Flame size={14} />,
    'كلاسيكيات الشرق الأوسط': <Flame size={14} />,
    'Oriental Herbs': <Leaf size={14} />,
    'أعشاب الشرق الأقصى': <Leaf size={14} />,
    'Functional Blends': <Heart size={14} />,
    'المزيجات الوظيفية': <Heart size={14} />,
    'Premium Gift': <Gift size={14} />,
    'هدايا فاخرة': <Gift size={14} />,
    'Ramadan Collection': <Gift size={14} />,
    'مجموعة رمضان': <Gift size={14} />,
  };

  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl text-emerald-deep mb-2">{t('products.title')}</h1>
          <p className="text-stone mb-8">{t('products.count', { count: filteredProducts.length })}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.en}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    isCategorySelected(cat)
                      ? 'bg-emerald-deep text-cream'
                      : 'bg-cream-dark text-emerald-deep hover:bg-emerald-deep/10'
                  }`}
                >
                  {categoryIcons[cat[lang]]}
                  {cat[lang]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-cream-dark rounded-lg text-sm text-emerald-deep"
              >
                <SlidersHorizontal size={14} />
                {t('products.filter')}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-cream-dark rounded-lg bg-cream text-emerald-deep text-sm focus:outline-none focus:border-gold"
              >
                <option value="default">{t('products.sortDefault')}</option>
                <option value="price-asc">{t('products.sortPriceAsc')}</option>
                <option value="price-desc">{t('products.sortPriceDesc')}</option>
                <option value="rating">{t('products.sortRating')}</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i % 4} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone">
            <p>{t('products.noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
