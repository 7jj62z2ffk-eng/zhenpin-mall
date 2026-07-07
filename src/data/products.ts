import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: { zh: '臻选手工皮具钱包', en: 'Premium Handcrafted Leather Wallet' },
    category: { zh: '皮具', en: 'Leather' },
    price: 1280,
    originalPrice: 1680,
    images: ['https://images.unsplash.com/photo-1627123424574-181ce5171c98?w=600&h=600&fit=crop'],
    description: {
      zh: '采用意大利进口头层牛皮，经由二十年经验工匠手工缝制。每一针每一线都凝聚着匠心与温度，随着时间推移，皮革会呈现出独一无二的温润光泽。',
      en: 'Made with Italian imported top-grain leather, hand-stitched by artisans with 20 years of experience. Every stitch embodies craftsmanship and warmth. Over time, the leather develops a unique, lustrous patina.'
    },
    specifications: [
      { key: { zh: '材质', en: 'Material' }, value: { zh: '意大利头层牛皮', en: 'Italian Top-Grain Leather' } },
      { key: { zh: '尺寸', en: 'Dimensions' }, value: { zh: '11cm x 9cm x 2cm', en: '11cm x 9cm x 2cm' } },
      { key: { zh: '卡位', en: 'Card Slots' }, value: { zh: '6个', en: '6' } },
      { key: { zh: '产地', en: 'Origin' }, value: { zh: '中国·上海', en: 'Shanghai, China' } },
    ],
    rating: 4.9,
    reviews: 128,
    inStock: true,
    tags: [{ zh: '热销', en: 'Bestseller' }, { zh: '手工', en: 'Handmade' }],
  },
  {
    id: '2',
    name: { zh: '古典檀木香薰炉', en: 'Classic Sandalwood Incense Burner' },
    category: { zh: '香道', en: 'Aromatherapy' },
    price: 899,
    images: ['https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=600&fit=crop'],
    description: {
      zh: '选用百年黑檀木整料雕刻，纹理细腻如丝。搭配天然沉香，在袅袅烟雾中感受东方禅意，为居家空间增添一份宁静雅致。',
      en: 'Crafted from century-old black sandalwood with fine, silky grain. Paired with natural agarwood, experience Eastern Zen amidst curling wisps of smoke, adding tranquility and elegance to your living space.'
    },
    specifications: [
      { key: { zh: '材质', en: 'Material' }, value: { zh: '黑檀木', en: 'Black Sandalwood' } },
      { key: { zh: '尺寸', en: 'Dimensions' }, value: { zh: '直径12cm x 高8cm', en: 'Diameter 12cm x H 8cm' } },
      { key: { zh: '工艺', en: 'Craftsmanship' }, value: { zh: '手工雕刻', en: 'Hand-Carved' } },
      { key: { zh: '配件', en: 'Accessories' }, value: { zh: '含铜制香插', en: 'Includes Copper Incense Holder' } },
    ],
    rating: 4.8,
    reviews: 86,
    inStock: true,
    tags: [{ zh: '新品', en: 'New' }],
  },
  {
    id: '3',
    name: { zh: '珐琅彩茶具套装', en: 'Cloisonne Tea Set' },
    category: { zh: '茶具', en: 'Tea Ware' },
    price: 2680,
    originalPrice: 3200,
    images: ['https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&h=600&fit=crop'],
    description: {
      zh: '传承景泰蓝工艺，以纯铜为胎，手工掐丝填釉，经八百度高温烧制而成。色彩绚丽持久，既是实用茶具，更是值得收藏的艺术品。',
      en: 'Inheriting the cloisonne craft, with pure copper as the base, hand-wired and glazed, fired at 800°C. Vibrant and long-lasting colors — both practical tea ware and a collectible work of art.'
    },
    specifications: [
      { key: { zh: '包含', en: 'Includes' }, value: { zh: '茶壶1 + 茶杯4 + 茶盘1', en: '1 Teapot + 4 Cups + 1 Tray' } },
      { key: { zh: '工艺', en: 'Craftsmanship' }, value: { zh: '景泰蓝珐琅', en: 'Cloisonne Enamel' } },
      { key: { zh: '容量', en: 'Capacity' }, value: { zh: '茶壶300ml', en: 'Teapot 300ml' } },
      { key: { zh: '包装', en: 'Packaging' }, value: { zh: '礼盒装', en: 'Gift Box' } },
    ],
    rating: 5.0,
    reviews: 42,
    inStock: true,
    tags: [{ zh: '限量', en: 'Limited' }, { zh: '礼品', en: 'Gift' }],
  },
  {
    id: '4',
    name: { zh: '纯银手工项链', en: 'Pure Silver Handmade Necklace' },
    category: { zh: '饰品', en: 'Jewelry' },
    price: 1580,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop'],
    description: {
      zh: '999纯银手工打造，表面采用古法磨砂工艺，呈现柔和哑光质感。简约几何造型，低调中彰显品味，适合日常佩戴。',
      en: 'Handcrafted with 999 pure silver, featuring an ancient frosted finish for a soft matte texture. Simple geometric design, understated yet refined, perfect for everyday wear.'
    },
    specifications: [
      { key: { zh: '材质', en: 'Material' }, value: { zh: '999纯银', en: '999 Pure Silver' } },
      { key: { zh: '链长', en: 'Chain Length' }, value: { zh: '45cm + 5cm延长链', en: '45cm + 5cm Extender' } },
      { key: { zh: '重量', en: 'Weight' }, value: { zh: '约8g', en: 'Approx. 8g' } },
      { key: { zh: '工艺', en: 'Craftsmanship' }, value: { zh: '古法磨砂', en: 'Ancient Frosted Finish' } },
    ],
    rating: 4.7,
    reviews: 215,
    inStock: true,
    tags: [{ zh: '热销', en: 'Bestseller' }],
  },
  {
    id: '5',
    name: { zh: '宣纸文房四宝套装', en: 'Xuan Paper Four Treasures Set' },
    category: { zh: '文房', en: 'Stationery' },
    price: 680,
    images: ['https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&h=600&fit=crop'],
    description: {
      zh: '精选安徽泾县宣纸，配以湖笔、徽墨、端砚。笔墨纸砚，四宝俱全。无论是书法初学者还是资深爱好者，都能找到书写乐趣。',
      en: 'Premium Xuan paper from Jingxian, Anhui, paired with Hu brush, Hui ink, and Duan inkstone. The four treasures complete — perfect for both calligraphy beginners and seasoned enthusiasts.'
    },
    specifications: [
      { key: { zh: '宣纸', en: 'Xuan Paper' }, value: { zh: '生宣四尺对开50张', en: 'Raw Xuan, 4-chi folded, 50 sheets' } },
      { key: { zh: '毛笔', en: 'Brush' }, value: { zh: '狼毫/羊毫各1支', en: '1 Wolf-hair + 1 Goat-hair' } },
      { key: { zh: '墨', en: 'Ink' }, value: { zh: '徽墨1锭', en: '1 Hui Ink Stick' } },
      { key: { zh: '砚', en: 'Inkstone' }, value: { zh: '端砚小号', en: 'Small Duan Inkstone' } },
    ],
    rating: 4.8,
    reviews: 93,
    inStock: true,
    tags: [{ zh: '新品', en: 'New' }, { zh: '礼品', en: 'Gift' }],
  },
  {
    id: '6',
    name: { zh: '手工陶瓷花瓶', en: 'Handmade Ceramic Vase' },
    category: { zh: '家居', en: 'Home Decor' },
    price: 780,
    originalPrice: 980,
    images: ['https://images.unsplash.com/photo-1612196808214-b7e239e5bbae?w=600&h=600&fit=crop'],
    description: {
      zh: '景德镇手工拉坯，采用天然矿物釉料，经1300度高温还原焰烧制。瓶身纹理自然流动，如同山水墨画，每一件都是孤品。',
      en: 'Hand-thrown in Jingdezhen, using natural mineral glazes, fired at 1300°C in reduction atmosphere. Natural flowing patterns like landscape ink paintings — each piece is one of a kind.'
    },
    specifications: [
      { key: { zh: '材质', en: 'Material' }, value: { zh: '高白泥', en: 'High-White Porcelain Clay' } },
      { key: { zh: '尺寸', en: 'Dimensions' }, value: { zh: '高25cm x 口径8cm', en: 'H 25cm x Rim 8cm' } },
      { key: { zh: '工艺', en: 'Craftsmanship' }, value: { zh: '手工拉坯', en: 'Hand-Thrown' } },
      { key: { zh: '釉色', en: 'Glaze' }, value: { zh: '窑变青釉', en: 'Kiln-Change Celadon' } },
    ],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    tags: [{ zh: '限量', en: 'Limited' }],
  },
  {
    id: '7',
    name: { zh: '真丝刺绣团扇', en: 'Silk Embroidered Round Fan' },
    category: { zh: '工艺', en: 'Crafts' },
    price: 458,
    images: ['https://images.unsplash.com/photo-1584992236310-6eddd734e6e6?w=600&h=600&fit=crop'],
    description: {
      zh: '选用太湖流域桑蚕丝，由苏绣非遗传承人亲手绣制。扇面图案栩栩如生，扇骨采用老竹经十二道工序打磨，轻盈而坚固。',
      en: 'Made with Taihu Lake mulberry silk, hand-embroidered by Su embroidery intangible heritage inheritors. Vivid patterns on the fan surface; ribs crafted from aged bamboo through 12 polishing processes — light yet sturdy.'
    },
    specifications: [
      { key: { zh: '扇面', en: 'Fan Surface' }, value: { zh: '真丝', en: 'Pure Silk' } },
      { key: { zh: '扇骨', en: 'Ribs' }, value: { zh: '老竹', en: 'Aged Bamboo' } },
      { key: { zh: '直径', en: 'Diameter' }, value: { zh: '25cm', en: '25cm' } },
      { key: { zh: '工艺', en: 'Craftsmanship' }, value: { zh: '苏绣双面绣', en: 'Suzhou Double-Sided Embroidery' } },
    ],
    rating: 4.9,
    reviews: 54,
    inStock: true,
    tags: [{ zh: '手工', en: 'Handmade' }, { zh: '新品', en: 'New' }],
  },
  {
    id: '8',
    name: { zh: '古琴造型蓝牙音箱', en: 'Guqin-Shaped Bluetooth Speaker' },
    category: { zh: '数码', en: 'Electronics' },
    price: 1280,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop'],
    description: {
      zh: '外观设计灵感源自唐代古琴，内置高保真双扬声器，支持蓝牙5.0连接。既是音箱也是摆件，让科技与传统美学完美融合。',
      en: 'Design inspired by Tang Dynasty guqin (ancient zither), with built-in high-fidelity dual speakers and Bluetooth 5.0. Both a speaker and a decorative piece — the perfect fusion of technology and traditional aesthetics.'
    },
    specifications: [
      { key: { zh: '材质', en: 'Material' }, value: { zh: '黑胡桃木', en: 'Black Walnut Wood' } },
      { key: { zh: '蓝牙', en: 'Bluetooth' }, value: { zh: '5.0', en: '5.0' } },
      { key: { zh: '续航', en: 'Battery Life' }, value: { zh: '12小时', en: '12 Hours' } },
      { key: { zh: '功率', en: 'Power' }, value: { zh: '20W', en: '20W' } },
    ],
    rating: 4.6,
    reviews: 178,
    inStock: true,
    tags: [{ zh: '热销', en: 'Bestseller' }],
  },
];

export const categories = [
  { zh: '全部', en: 'All' },
  { zh: '皮具', en: 'Leather' },
  { zh: '香道', en: 'Aromatherapy' },
  { zh: '茶具', en: 'Tea Ware' },
  { zh: '饰品', en: 'Jewelry' },
  { zh: '文房', en: 'Stationery' },
  { zh: '家居', en: 'Home Decor' },
  { zh: '工艺', en: 'Crafts' },
  { zh: '数码', en: 'Electronics' },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: { zh: '林女士', en: 'Ms. Lin' },
    rating: 5,
    comment: {
      zh: '皮具钱包质感太好了，手感细腻，缝线工整。送给先生的生日礼物，他非常喜欢。',
      en: 'The leather wallet has amazing quality, delicate feel, and neat stitching. Bought it as a birthday gift for my husband — he loves it very much.'
    },
    date: '2025-06-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  {
    id: '2',
    name: { zh: '张先生', en: 'Mr. Zhang' },
    rating: 5,
    comment: {
      zh: '香薰炉的做工超出预期，檀木纹理很美，放在书房里整个空间都提升了一个档次。',
      en: 'The craftsmanship of the incense burner exceeded my expectations. The sandalwood grain is beautiful, and it really elevates the whole study room.'
    },
    date: '2025-06-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  },
  {
    id: '3',
    name: { zh: '王女士', en: 'Ms. Wang' },
    rating: 5,
    comment: {
      zh: '茶具套装太精美了，色彩比图片还要好看。送给客户很有面子，已经回购三套了。',
      en: 'The tea set is exquisite, the colors look even better than in the pictures. Great for gifting to clients — I have repurchased three sets already.'
    },
    date: '2025-05-28',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  },
  {
    id: '4',
    name: { zh: '陈先生', en: 'Mr. Chen' },
    rating: 4,
    comment: {
      zh: '项链设计简约大方，日常佩戴很合适。纯银材质不过敏，做工也很好。',
      en: 'The necklace design is simple and elegant, perfect for everyday wear. Pure silver material causes no allergies, and the craftsmanship is excellent.'
    },
    date: '2025-05-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  },
];
