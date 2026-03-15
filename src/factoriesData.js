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
    // 6 human (05,06,07,08,09,10) + 14 product — pattern: H,P,P, H,P,P, H,P,P,P, H,P,P, H,P,P, H,P,P,P
    productPhotos: [
      5, 1, 2, 6, 3, 4, 7, 11, 12, 13, 8, 14, 15, 9, 16, 17, 10, 18, 19, 20,
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
    // 7 human (04,05,06,10,12,14,19) + 13 product — pattern: H,P,P repeating, last cycle H,P
    productPhotos: [
      4, 1, 2, 5, 3, 7, 6, 8, 9, 10, 11, 13, 12, 15, 16, 14, 17, 18, 19, 20,
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
    // 3 human (05,14,17) + 17 product — humans at positions 1,8,14
    productPhotos: [
      5, 1, 2, 3, 4, 6, 7, 14, 8, 9, 10, 11, 12, 17, 13, 15, 16, 18, 19, 20,
    ].map(n => p('/factories/peishang/products', n)),
  },
  {
    name: 'XLENTAG',
    description:
      'XLENTAG — производитель уникальных украшений с натуральным жемчугом и камнями.',
    factoryPhotos: [],
    certificates: [],
    // 13 human (01,03,04,05,06,08,11,12,13,14,15,16,20) + 7 product — products at every ~3rd pos
    productPhotos: [
      1, 2, 3, 4, 7, 5, 6, 9, 8, 11, 10, 12, 13, 17, 14, 15, 18, 16, 20, 19,
    ].map(n => p('/factories/xlentag/products', n)),
  },
];
