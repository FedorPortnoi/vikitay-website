const range = (n, path, ext) =>
  Array.from({ length: n }, (_, i) => `${path}/product-${String(i + 1).padStart(2, '0')}.${ext}`);

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
    productPhotos: range(20, '/factories/oufeiya/products', 'jpg'),
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
    productPhotos: range(20, '/factories/hongbang/products', 'jpg'),
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
    productPhotos: range(20, '/factories/peishang/products', 'jpg'),
  },
  {
    name: 'XLENTAG',
    description:
      'XLENTAG — производитель уникальных украшений с натуральным жемчугом и камнями.',
    factoryPhotos: [],
    certificates: [],
    productPhotos: range(20, '/factories/xlentag/products', 'jpg'),
  },
];
