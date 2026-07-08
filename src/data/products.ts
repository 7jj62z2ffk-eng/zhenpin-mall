import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: { en: 'Cardamom & Cinnamon Digestive Tea', ar: 'شاي الهضم بالهيل والقرفة' },
    category: { en: 'Middle Eastern Classics', ar: 'كلاسيكيات شرقية' },
    price: 24,
    originalPrice: 32,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=cardamom%20cinnamon%20tea%20golden%20cup%20spices%20warm%20luxury%20middle%20eastern%20aesthetic&image_size=square'],
    description: {
      en: 'A beloved Middle Eastern blend featuring Ceylon cinnamon, cardamom pods, ginger, licorice root, and red date slices. Perfect after heavy meals to ease digestion, reduce bloating, and stabilize blood sugar. Can be enjoyed hot or cold. Essential for Iftar during Ramadan.',
      ar: 'مزيج شرق أوسطي محبوب يضم القرفة السيلانية، حبوب الهيل، الزنجبيل، جذور عرق السوس، وشرائح التمر الأحمر. مثالي بعد الوجبات الثقيلة لتسهيل الهضم، وتقليل الانتفاخ، وتثبيت سكر الدم. يمكن تناوله ساخناً أو بارداً. ضروري لإفطار رمضان.'
    },
    ingredients: {
      en: 'Cardamom, Ceylon Cinnamon, Ginger, Licorice Root, Red Date',
      ar: 'هيل، قرفة سيلانية، زنجبيل، عرق السوس، تمر أحمر'
    },
    benefits: ['Aids digestion', 'Reduces bloating', 'Stabilizes blood sugar', 'Warms the stomach', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 250ml hot water (90°C) for 5–7 minutes. For cold brew, steep in cold water for 4 hours.',
      ar: 'انقع كيس الشاي الواحد في 250 مل ماء ساخن (90°م) لمدة 5-7 دقائق. للتبريد، انقع في ماء بارد لمدة 4 ساعات.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.9,
    reviews: 312,
    inStock: true,
    tags: [{ en: 'Bestseller', ar: 'الأكثر مبيعاً' }, { en: 'Ramadan Essential', ar: 'ضروري لرمضان' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '2',
    name: { en: 'Saffron & Rose Glow Tea', ar: 'شاي الزعفران والورد للتألق' },
    category: { en: 'Premium Gift', ar: 'هدايا فاخرة' },
    price: 45,
    originalPrice: 58,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=saffron%20rose%20tea%20golden%20luxury%20cup%20dried%20rose%20petals%20elegant%20middle%20eastern&image_size=square'],
    description: {
      en: 'Our most luxurious blend featuring premium Iranian saffron, Damascus rose petals, lemon verbena, and a touch of chamomile. Soothes the mind, brightens complexion, and provides powerful antioxidants. The perfect gift for someone special.',
      ar: 'أفخر مزيج لدينا يضم زعفران إيراني فاخر، بتلات ورد دمشقي، ليمون فيربينا، ولمسة البابونج. يهدئ العقل، ي brighten البشرة، ويوفر مضادات أكسدة قوية. الهدية المثالية لشخص مميز.'
    },
    ingredients: {
      en: 'Iranian Saffron, Damascus Rose, Lemon Verbena, Chamomile',
      ar: 'زعفران إيراني، ورد دمشقي، فيربينا الليمون، بابونج'
    },
    benefits: ['Brightens skin', 'Relieves anxiety', 'Rich in antioxidants', 'Promotes relaxation', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 250ml hot water (85°C) for 4–6 minutes. Best enjoyed in the evening.',
      ar: 'انقع كيس الشاي في 250 مل ماء ساخن (85°م) لمدة 4-6 دقائق. الأفضل تناوله في المساء.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 5.0,
    reviews: 186,
    inStock: true,
    tags: [{ en: 'Limited Edition', ar: 'إصدار محدود' }, { en: 'Gift Favorite', ar: 'مفضل للهدايا' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '3',
    name: { en: 'Hibiscus & Mint Cool Tea', ar: 'شاي الكركدى والنعناع المنعش' },
    category: { en: 'Middle Eastern Classics', ar: 'كلاسيكيات شرقية' },
    price: 22,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=hibiscus%20mint%20tea%20ruby%20red%20cold%20glass%20fresh%20lemongrass%20middle%20eastern&image_size=square'],
    description: {
      en: 'A refreshing twist on the traditional Karkadeh, blending hibiscus flowers, fresh mint, lemongrass, and dried orange slices. Naturally cooling, diuretic, and blood pressure friendly. The ultimate summer thirst-quencher, especially when iced.',
      ar: 'لمسة منعشة على الكركديه التقليدي، يمزج أزهار الكركدى، النعناع الطازج، عشب الليمون، وشرائح البرتقال المجفف. منعش طبيعياً، مدر للبول، وصديق لضغط الدم. أفضل مشروب صيفي للترويح، خاصة عند تبريده.'
    },
    ingredients: {
      en: 'Hibiscus (Karkadeh), Mint, Lemongrass, Dried Orange',
      ar: 'كركدى، نعناع، عشب الليمون، برتقال مجفف'
    },
    benefits: ['Cooling effect', 'Reduces water retention', 'Blood pressure friendly', 'Rich in Vitamin C', 'Caffeine-free'],
    brewMethod: {
      en: 'Hot: Steep 5–7 minutes at 95°C. Cold: Steep 2 tea bags in 500ml cold water for 4 hours. Add honey to taste.',
      ar: 'ساخن: انقع 5-7 دقائق عند 95°م. بارد: انقع كيسي شاي في 500 مل ماء بارد لمدة 4 ساعات. أضف العسل حسب الرغبة.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.8,
    reviews: 245,
    inStock: true,
    tags: [{ en: 'Summer Essential', ar: 'ضروري للصيف' }, { en: 'Iced Tea', ar: 'شاي مثلج' }],
    isHalal: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '4',
    name: { en: 'Yuzhu & Ophiopogon Moisture Tea', ar: 'شاي يو تشو ولفوف الرطوبة' },
    category: { en: 'Oriental Herbs', ar: 'أعشاب شرقية' },
    price: 28,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=oriental%20herbal%20tea%20yuzhu%20lily%20bulb%20white%20porcelain%20cup%20elegant%20minimal%20green%20tones&image_size=square'],
    description: {
      en: 'A rare Eastern herbal blend combining Yuzhu (Solomon\'s Seal), Ophiopogon root, licorice, lemon slices, and a hint of mint. Designed to combat dry air-conditioned environments, soothe irritated throats, and calm internal heat. A caffeine-free hydration ritual inspired by ancient Chinese wellness traditions.',
      ar: 'مزيج نادر من الأعشاب الشرقية يجمع يو تشو، جذر اللفوف، عرق السوس، شرائح الليمون، ولمسة من النعناع. مصمم لمكافحة الجو الجاف بالتكييف، وتلطيف الحلق المتهيج، وتبريد الحرارة الداخلية. طقس ترطيب خالٍ من الكافيين مستوحى من تقاليد العافية الصينية القديمة.'
    },
    ingredients: {
      en: 'Yuzhu (Solomon\'s Seal), Ophiopogon Root, Licorice, Lemon, Mint',
      ar: 'يو تشو، جذر اللفوف، عرق السوس، ليمون، نعناع'
    },
    benefits: ['Soothes dry throat', 'Combats AC dryness', 'Calms internal heat', 'All-day hydration', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 300ml hot water (80°C) for 6–8 minutes. Re-steep up to 2 times.',
      ar: 'انقع كيس الشاي في 300 مل ماء ساخن (80°م) لمدة 6-8 دقائق. يمكن إعادة النقع حتى مرتين.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'China herbs, UAE blended', ar: 'أعشاب صينية، مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.7,
    reviews: 98,
    inStock: true,
    tags: [{ en: 'New Arrival', ar: 'وصل حديثاً' }, { en: 'Oriental Secret', ar: 'سر شرقي' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '5',
    name: { en: 'Goji & Red Date Vitality Tea', ar: 'شاي الغوجي والتمر الأحمر للحيوية' },
    category: { en: 'Oriental Herbs', ar: 'أعشاب شرقية' },
    price: 26,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=goji%20berry%20red%20date%20tea%20golden%20amber%20cup%20chinese%20herbal%20warm%20elegant%20luxury&image_size=square'],
    description: {
      en: 'A nurturing blend of Ningxia goji berries, pitted red dates, cinnamon, and rose petals. Specially formulated for women\'s wellness — easing fatigue, supporting blood vitality, and providing gentle warmth during sensitive times. A thoughtful gift for the women in your life.',
      ar: 'مزيج مُغذٍ من توت الغوجي من نينغشيا، التمر الأحمر منزوع النوى، القرفة، وبتلات الورد. مُصاغ خصيصاً لعافية المرأة — يخفف التعب، يدعم حيوية الدم، ويوفر دفئاً لطيفاً خلال الأوقات الحساسة. هدية مدروسة للنساء في حياتك.'
    },
    ingredients: {
      en: 'Ningxia Goji Berry, Red Date, Cinnamon, Rose Petals',
      ar: 'توت غوجي من نينغشيا، تمر أحمر، قرفة، بتلات ورد'
    },
    benefits: ['Boosts energy', 'Supports blood vitality', 'Eases fatigue', 'Gentle warming', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 300ml hot water (90°C) for 5–8 minutes. Best enjoyed in the morning or afternoon.',
      ar: 'انقع كيس الشاي في 300 مل ماء ساخن (90°م) لمدة 5-8 دقائق. الأفضل تناوله في الصباح أو بعد الظهر.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'China herbs, UAE blended', ar: 'أعشاب صينية، مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    tags: [{ en: 'Women\'s Wellness', ar: 'عافية المرأة' }, { en: 'Gift Box', ar: 'صندوق هدية' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '6',
    name: { en: 'Dandelion & Licorice Detox Tea', ar: 'شاي الهندباء وعرق السوس للتنقية' },
    category: { en: 'Functional Blends', ar: 'مزيج وظيفي' },
    price: 25,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=dandelion%20root%20licorice%20detox%20tea%20amber%20golden%20cup%20herbal%20wellness%20elegant%20minimal&image_size=square'],
    description: {
      en: 'A gentle detox blend featuring roasted dandelion root, licorice, mint, and ginger. Supports the body\'s natural cleansing processes, reduces water retention, and helps recover from heavy, oily meals. No harsh laxatives — just pure botanical support.',
      ar: 'مزيج تنقية لطيف يضم جذر الهندباء المحمص، عرق السوس، النعناع، والزنجبيل. يدعم عمليات التطهير الطبيعية للجسم، يقلل الاحتباس المائي، ويساعد على التعافي من الوجبات الثقيلة والدهنية. لا ملينات قاسية — فقط دعم نباتي نقي.'
    },
    ingredients: {
      en: 'Dandelion Root, Licorice, Mint, Ginger',
      ar: 'جذر الهندباء، عرق السوس، نعناع، زنجبيل'
    },
    benefits: ['Gentle detox', 'Reduces bloating', 'Supports liver health', 'Post-meal recovery', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 250ml hot water (95°C) for 5–7 minutes. Drink after lunch or dinner.',
      ar: 'انقع كيس الشاي في 250 مل ماء ساخن (95°م) لمدة 5-7 دقائق. اشرب بعد الغداء أو العشاء.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.6,
    reviews: 134,
    inStock: true,
    tags: [{ en: 'Detox', ar: 'تنقية' }, { en: 'Fitness Friendly', ar: 'صديق اللياقة' }],
    isHalal: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '7',
    name: { en: 'Lavender & Holy Basil Sleep Tea', ar: 'شاي الخزامى والريحان المقدس للنوم' },
    category: { en: 'Functional Blends', ar: 'مزيج وظيفي' },
    price: 27,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=lavender%20holy%20basil%20tulsi%20sleep%20tea%20purple%20golden%20cup%20calming%20evening%20elegant&image_size=square'],
    description: {
      en: 'A calming nighttime ritual featuring Holy Basil (Tulsi), French lavender, chamomile, and lemon balm. Naturally eases tension, quiets racing thoughts, and prepares the mind for deep, restful sleep. No melatonin — just pure botanical tranquility.',
      ar: 'طقس مسائي مهدئ يضم الريحان المقدس (تولسي)، الخزامى الفرنسية، البابونج، وبلسم الليمون. يخفف التوتر طبيعياً، يهدئ الأفكار المتسارعة، ويُعد العقل لنوم عميق ومريح. لا ميلاتونين — فقط هدوء نباتي نقي.'
    },
    ingredients: {
      en: 'Holy Basil (Tulsi), Lavender, Chamomile, Lemon Balm',
      ar: 'ريحان مقدس (تولسي)، خزامى، بابونج، بلسم ليمون'
    },
    benefits: ['Promotes sleep', 'Reduces anxiety', 'Quiets the mind', 'Stress relief', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 250ml hot water (85°C) for 5–7 minutes. Drink 30 minutes before bedtime.',
      ar: 'انقع كيس الشاي في 250 مل ماء ساخن (85°م) لمدة 5-7 دقائق. اشرب 30 دقيقة قبل النوم.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    tags: [{ en: 'Sleep Aid', ar: 'مساعد النوم' }, { en: 'Stress Relief', ar: 'تخفيف التوتر' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '8',
    name: { en: 'Plantain & Mint Men\'s Wellness Tea', ar: 'شاي اللسانة والنعناع لعافية الرجال' },
    category: { en: 'Functional Blends', ar: 'مزيج وظيفي' },
    price: 24,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=plantain%20mint%20mens%20wellness%20tea%20dark%20green%20cup%20herbal%20strong%20masculine%20elegant&image_size=square'],
    description: {
      en: 'A targeted blend for men\'s daily wellness, combining plantain leaf, peppermint, cardamom, and licorice. Supports urinary tract comfort, reduces inflammation from sedentary lifestyles, and provides a clean, refreshing finish. Sleek, modern packaging designed for the modern gentleman.',
      ar: 'مزيج موجه لعافية الرجال اليومية، يجمع ورق اللسانة، النعناع الفلفلي، الهيل، وعرق السوس. يدعم راحة المسالك البولية، يقلل الالتهاب من نمط الحياة الخامل، ويوفر نهاية منعشة ونظيفة. تعبئة أنيقة وعصرية مصممة للرجل العصري.'
    },
    ingredients: {
      en: 'Plantain Leaf, Peppermint, Cardamom, Licorice',
      ar: 'ورق اللسانة، نعناع فلفلي، هيل، عرق السوس'
    },
    benefits: ['Urinary comfort', 'Anti-inflammatory', 'Refreshing finish', 'Daily wellness', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 300ml hot water (90°C) for 5–7 minutes. Enjoy 1–2 cups daily.',
      ar: 'انقع كيس الشاي في 300 مل ماء ساخن (90°م) لمدة 5-7 دقائق. استمتع ب1-2 كوب يومياً.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.5,
    reviews: 87,
    inStock: true,
    tags: [{ en: 'Men\'s Health', ar: 'صحة الرجال' }, { en: 'Daily Ritual', ar: 'طقس يومي' }],
    isHalal: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '9',
    name: { en: 'Turmeric & Lemongrass Immunity Tea', ar: 'شاي الكركم وعشب الليمون للمناعة' },
    category: { en: 'Functional Blends', ar: 'مزيج وظيفي' },
    price: 26,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=turmeric%20lemongrass%20immunity%20tea%20golden%20yellow%20cup%20spices%20warm%20wellness%20elegant&image_size=square'],
    description: {
      en: 'A powerful immune-supporting blend of turmeric, ginger, lemongrass, clove, and dried orange. Rich in anti-inflammatory compounds with a warm, spicy flavor profile that resonates with Middle Eastern palates. Your daily shield for seasonal transitions.',
      ar: 'مزيج قوي لدعم المناعة من الكركم، الزنجبيل، عشب الليمون، القرنفل، والبرتقال المجفف. غني بمركبات مضادة للالتهابات مع نكهة حارة وبهيجة تتناغم مع المذاق الشرق أوسطي. درعك اليومي للتغيرات الموسمية.'
    },
    ingredients: {
      en: 'Turmeric, Ginger, Lemongrass, Clove, Dried Orange',
      ar: 'كركم، زنجبيل، عشب ليمون، قرنفل، برتقال مجفف'
    },
    benefits: ['Immune support', 'Anti-inflammatory', 'Seasonal defense', 'Warming spice', 'Caffeine-free'],
    brewMethod: {
      en: 'Steep 1 tea bag in 300ml hot water (95°C) for 5–7 minutes. Add a teaspoon of honey for extra warmth.',
      ar: 'انقع كيس الشاي في 300 مل ماء ساخن (95°م) لمدة 5-7 دقائق. أضف ملعقة صغيرة من العسل لدفء إضافي.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '36g (3g x 12 sachets)', ar: '36 جرام (3 جرام × 12 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'Caffeine-free', ar: 'خالٍ من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 4.7,
    reviews: 178,
    inStock: true,
    tags: [{ en: 'Immunity', ar: 'مناعة' }, { en: 'Year-round', ar: 'على مدار العام' }],
    isHalal: true,
    isOrganic: true,
    weight: '36g',
    boxSize: '12 sachets',
  },
  {
    id: '10',
    name: { en: 'Ramadan Wellness Gift Set', ar: 'طقم هدية العافية لرمضان' },
    category: { en: 'Ramadan Collection', ar: 'مجموعة رمضان' },
    price: 78,
    originalPrice: 95,
    images: ['https://neeko-copilot.bytedance.net/api/text2image?prompt=ramadan%20gift%20box%20luxury%20tea%20set%20golden%20green%20islamic%20geometric%20pattern%20elegant%20packaging&image_size=square'],
    description: {
      en: 'The ultimate Ramadan gift set featuring three specially curated blends: Suhoor Saffron Rose (anti-fatigue, mood support), Iftar Cardamom Digestive (post-meal relief), and Nighttime Lavender Sleep (restful sleep). Beautifully presented in a premium gift box with gold foil accents. 36 sachets total (12 of each).',
      ar: 'أفضل طقم هدايا لرمضان يضم ثلاثة مزيجات مختارة بعناية: زعفران وورد السحور (مضاد للتعب، دعم المزاج)، هيل الهضم للإفطار (إعفاء بعد الوجبة)، وخزامى النوم الليلي (نوم مريح). مُقدم بشكل جميل في صندوق هدية فاخر مع لمسات ذهبية. 36 كيساً إجمالاً (12 من كل نوع).'
    },
    ingredients: {
      en: 'Saffron Rose blend, Cardamom Digestive blend, Lavender Sleep blend',
      ar: 'مزيج زعفران وورد، مزيج هيل هضمي، مزيج خزامى نوم'
    },
    benefits: ['Complete Ramadan support', 'Suhoor energy', 'Iftar digestion', 'Nighttime rest', 'Gift-ready packaging'],
    brewMethod: {
      en: 'Each blend has its own brewing instructions printed on the inner sachets. Follow the guide inside the box.',
      ar: 'لكل مزيج تعليمات خاصة مطبوعة على الأكياس الداخلية. اتبع الدليل داخل الصندوق.'
    },
    specifications: [
      { key: { en: 'Net Weight', ar: 'الوزن الصافي' }, value: { en: '108g (3g x 36 sachets)', ar: '108 جرام (3 جرام × 36 كيس)' } },
      { key: { en: 'Origin', ar: 'الأصل' }, value: { en: 'UAE blended', ar: 'مُخلوط في الإمارات' } },
      { key: { en: 'Caffeine', ar: 'الكافيين' }, value: { en: 'All caffeine-free', ar: 'جميعها خالية من الكافيين' } },
      { key: { en: 'Certification', ar: 'الشهادة' }, value: { en: 'Halal Certified', ar: 'حلال معتمد' } },
    ],
    rating: 5.0,
    reviews: 89,
    inStock: true,
    tags: [{ en: 'Ramadan Special', ar: 'رمضان خاص' }, { en: 'Gift Set', ar: 'طقم هدية' }],
    isHalal: true,
    isOrganic: true,
    weight: '108g',
    boxSize: '36 sachets (3 blends)',
  },
];

export const categories = [
  { en: 'All', ar: 'الكل' },
  { en: 'Middle Eastern Classics', ar: 'كلاسيكيات الشرق الأوسط' },
  { en: 'Oriental Herbs', ar: 'أعشاب الشرق الأقصى' },
  { en: 'Functional Blends', ar: 'المزيجات الوظيفية' },
  { en: 'Premium Gift', ar: 'هدايا فاخرة' },
  { en: 'Ramadan Collection', ar: 'مجموعة رمضان' },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: { en: 'Fatima Al-Rashid', ar: 'فاطمة الرشيد' },
    rating: 5,
    comment: {
      en: 'The Cardamom & Cinnamon tea is absolutely divine! Perfect after our family dinners. My husband loves it too. Will definitely repurchase for Ramadan.',
      ar: 'شاي الهيل والقرفة إلهي تماماً! مثالي بعد عشاء عائلتنا. زوجي يحبه أيضاً. سأعيد الشراء بالتأكيد لرمضان.'
    },
    date: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  {
    id: '2',
    name: { en: 'Omar Hassan', ar: 'عمر حسن' },
    rating: 5,
    comment: {
      en: 'Bought the Ramadan gift set for my mother. The packaging is stunning and the teas are exceptional quality. She uses the digestive tea every night after Iftar.',
      ar: 'اشتريت طقم هدية رمضان لأمي. التعبير مذهل والشاي جودة استثنائية. تستخدم شاي الهضم كل ليلة بعد الإفطار.'
    },
    date: '2025-06-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  },
  {
    id: '3',
    name: { en: 'Sarah Mitchell', ar: 'سارة ميتشيل' },
    rating: 5,
    comment: {
      en: 'As an expat in Dubai, finding quality caffeine-free teas was a challenge. The Hibiscus & Mint is my daily go-to. Love the cold brew option for summer!',
      ar: 'كأجنبية في دبي، كان العثور على شاي خالٍ من الكافيين بجودة عالية تحدياً. الكركدى والنعناع هو خياري اليومي. أحب خيار التبريد للصيف!'
    },
    date: '2025-05-28',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  },
  {
    id: '4',
    name: { en: 'Khalid Al-Mansouri', ar: 'خالد المنصوري' },
    rating: 4,
    comment: {
      en: 'The Men\'s Wellness tea surprised me. Clean taste, not too herbal. I drink it after gym sessions. Would recommend trying the immunity blend too.',
      ar: 'شاي عافية الرجال فاجأني. طعم نظيف، ليس عشبياً جداً. أشربه بعد جلسات النادي الرياضي. أوصي بتجربة مزيج المناعة أيضاً.'
    },
    date: '2025-05-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  },
];
