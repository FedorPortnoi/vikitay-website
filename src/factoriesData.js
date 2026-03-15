const p = (path, n) => `${path}/product-${String(n).padStart(2, '0')}.jpg`;

export const factoriesData = [
  {
    name: 'DONGGUAN OUFEIYA LEATHER CO., LTD',
    description:
      'Dongguan Oufeiya Leather Co., Ltd — один из ведущих производителей кожаных сумок, портфелей и кошельков с 28-летним опытом. Фабрика-парк площадью 20 000 м² в городе Дунгуань. 500+ сотрудников, выпуск 50 000–60 000 изделий в месяц. 80% кожи — из Италии и Бразилии.',
    factoryPhotos: [
      '/factories/oufeiya/factory/factory-1.jpg',
      '/factories/oufeiya/factory/factory-2.jpg',
      '/factories/oufeiya/factory/factory-3.jpg',
      '/factories/oufeiya/factory/factory-4.jpg',
    ],
    certificates: [],
    // Color-separated order: blue, burg, brown, red, dkBrown, tan, burg, gray, tan, burg, red, burg, tan, burg, brown, burg, red, dkBrown, burg, brown
    productPhotos: [
      4, 5, 1, 16, 13, 8, 11, 3, 14, 12, 2, 17, 9, 19, 7, 20, 6, 18, 10, 15,
    ].map(n => p('/factories/oufeiya/products', n)),
  },
  {
    name: 'HONGBANG LEATHER CO. LTD',
    description:
      'HongBang — это дизайн-бюро, производство 7500 кв.м. и дистрибуционный центр высококачественных кожаных изделий для международных брендов, оптовиков и розничных продавцов. С 2011 года фабрика сосредоточена на исследованиях, дизайне и производстве высококачественных кожаных изделий. 12+ лет опыта, 2000+ моделей, 10+ профессиональных дизайнеров.',
    factoryPhotos: [
      '/factories/hongbang/factory/factory-1.webp',
      '/factories/hongbang/factory/factory-2.webp',
      '/factories/hongbang/factory/factory-3.webp',
      '/factories/hongbang/factory/factory-4.webp',
      '/factories/hongbang/factory/factory-5.webp',
    ],
    certificates: [
      '/factories/hongbang/certificates/cert-1.jpg',
      '/factories/hongbang/certificates/cert-2.jpg',
      '/factories/hongbang/certificates/cert-3.jpg',
      '/factories/hongbang/certificates/cert-4.jpg',
    ],
    // Color-separated order: green, burg, white, dkBrown, beige, burg, blue, brown, silver, black, beige, burg, sage, dkBrown, black, beige, black, mauve, brown, dkGray
    productPhotos: [
      3, 5, 1, 9, 14, 17, 7, 12, 16, 4, 2, 18, 15, 11, 10, 8, 19, 13, 6, 20,
    ].map(n => p('/factories/hongbang/products', n)),
  },
  {
    name: 'GUANGZHOU PEISHANG JEWELRY CO. LTD',
    description:
      'PSJ / Guangzhou Peishang Jewelry Co., Ltd. — производитель из Гуанчжоу, более 15 лет специализирующийся на качественной модной бижутерии и украшениях на заказ. Серебро 925, латунь, золото. 3D-эскизы за 48 часов. Годовая мощность — более 3 млн изделий. Сертификация SGS.',
    factoryPhotos: [
      '/factories/peishang/factory/factory-1.webp',
      '/factories/peishang/factory/factory-2.webp',
      '/factories/peishang/factory/factory-3.webp',
      '/factories/peishang/factory/factory-4.webp',
      '/factories/peishang/factory/factory-5.webp',
    ],
    certificates: [],
    productPhotos: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map(n => p('/factories/peishang/products', n)),
  },
  {
    name: 'XLENTAG',
    description:
      'XLENTAG — производитель уникальных украшений с натуральным жемчугом и камнями.',
    factoryPhotos: [],
    certificates: [],
    productPhotos: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map(n => p('/factories/xlentag/products', n)),
  },
];
