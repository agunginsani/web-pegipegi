export type ExploreItem = {
  name: string;
  image: string;
  url: string;
  price: number;
  inventory?: number;
};

export const hotel: Array<ExploreItem> = [
  {
    name: 'Bandung',
    image: '/explores/hotel-1.webp',
    url: '/hotel/bandung/',
    price: 47535,
    inventory: 2603,
  },
  {
    name: 'Yogya',
    image: '/explores/hotel-2.webp',
    url: '/hotel/jogja/',
    price: 47500,
    inventory: 2158,
  },
  {
    name: 'Bogor',
    image: '/explores/hotel-3.webp',
    url: '/hotel/bogor/',
    price: 50157,
    inventory: 541,
  },
  {
    name: 'Semarang',
    image: '/explores/hotel-4.webp',
    url: `/hotel/semarang/`,
    price: 49866,
    inventory: 654,
  },
  {
    name: 'Puncak',
    image: '/explores/hotel-5.webp',
    url: `/hotel/puncak/`,
    price: 55240,
    inventory: 376,
  },
  {
    name: 'Malang',
    image: '/explores/hotel-6.webp',
    url: `/hotel/malang/`,
    price: 39428,
    inventory: 1775,
  },
  {
    name: 'Bali',
    image: '/explores/hotel-7.webp',
    url: `/hotel/bali/`,
    price: 52340,
    inventory: 5170,
  },
  {
    name: 'Surabaya',
    image: '/explores/hotel-8.webp',
    url: `/hotel/surabaya/`,
    price: 55792,
    inventory: 1247,
  },
  {
    name: 'Jakarta',
    image: '/explores/hotel-9.webp',
    url: `/hotel/jakarta/`,
    price: 63252,
    inventory: 5191,
  },
  {
    name: 'Solo',
    image: '/explores/hotel-10.webp',
    url: `/hotel/solo/`,
    price: 73333,
    inventory: 277,
  },
  {
    name: 'Pangandaran',
    image: '/explores/hotel-11.webp',
    url: `/hotel/pangandaran/`,
    price: 105136,
    inventory: 169,
  },
  {
    name: 'Palembang',
    image: '/explores/hotel-12.webp',
    url: `/hotel/palembang/`,
    price: 50160,
    inventory: 289,
  },
];

export const flight: Array<ExploreItem> = [
  {
    name: 'Jakarta → Bali',
    image: '/explores/flight-1.webp',
    url: '/flight/dari-jakarta-ke-bali/',
    price: 679000,
  },
  {
    name: 'Medan → Jakarta',
    image: '/explores/flight-2.webp',
    url: '/flight/dari-medan-ke-jakarta/',
    price: 795000,
  },
  {
    name: 'Jakarta → Medan',
    image: '/explores/flight-3.webp',
    url: '/flight/dari-jakarta-ke-medan/',
    price: 787000,
  },
  {
    name: 'Jakarta → Surabaya',
    image: '/explores/flight-4.webp',
    url: '/flight/dari-jakarta-ke-surabaya/',
    price: 603000,
  },
  {
    name: 'Jakarta → Padang',
    image: '/explores/flight-5.webp',
    url: '/flight/dari-jakarta-ke-padang/',
    price: 992000,
  },
  {
    name: 'Jakarta → Yogyakarta',
    image: '/explores/flight-6.webp',
    url: '/flight/dari-jakarta-ke-jogja/',
    price: 1241585,
  },
  {
    name: 'Jakarta → Palembang',
    image: '/explores/flight-7.webp',
    url: '/flight/dari-jakarta-ke-palembang/',
    price: 528000,
  },
  {
    name: 'Jakarta → Makassar',
    image: '/explores/flight-8.webp',
    url: '/flight/dari-jakarta-ke-makassar/',
    price: 927000,
  },
  {
    name: 'Medan → Batam',
    image: '/explores/flight-9.webp',
    url: '/flight/dari-medan-ke-batam/',
    price: 816511,
  },
  {
    name: 'Jakarta → Pontianak',
    image: '/explores/flight-10.webp',
    url: '/flight/dari-medan-ke-pontianak/',
    price: 773000,
  },
  {
    name: 'Surabaya → Balikpapan',
    image: '/explores/flight-11.webp',
    url: '/flight/dari-surabaya-ke-balikpapan/',
    price: 750000,
  },
  {
    name: 'Surabaya → Bali',
    image: '/explores/flight-12.webp',
    url: '/flight/dari-surabaya-ke-bali/',
    price: 545000,
  },
];

export const train: Array<ExploreItem> = [
  {
    name: 'Jakarta → Yogyakarta',
    image: '/explores/train-1.webp',
    url: '/kereta-api/dari-jakarta-ke-jogja/',
    price: 74000,
  },
  {
    name: 'Jakarta → Bandung',
    image: '/explores/train-2.webp',
    url: '/kereta-api/dari-jakarta-ke-bandung/',
    price: 45000,
  },
  {
    name: 'Jakarta → Surabaya',
    image: '/explores/train-3.webp',
    url: '/kereta-api/dari-jakarta-ke-surabaya/',
    price: 104000,
  },
  {
    name: 'Yogyakarta → Jakarta',
    image: '/explores/train-4.webp',
    url: '/kereta-api/dari-jogja-ke-jakarta/',
    price: 74000,
  },
  {
    name: 'Jakarta → Malang',
    image: '/explores/train-5.webp',
    url: '/kereta-api/dari-jakarta-ke-malang/',
    price: 250000,
  },
  {
    name: 'Jakarta → Semarang',
    image: '/explores/train-6.webp',
    url: '/kereta-api/dari-jakarta-ke-semarang/',
    price: 104000,
  },
  {
    name: 'Jakarta → Solo',
    image: '/explores/train-7.webp',
    url: '/kereta-api/dari-jakarta-ke-solo/',
    price: 74000,
  },
  {
    name: 'Jakarta → Purwokerto',
    image: '/explores/train-8.webp',
    url: '/kereta-api/dari-jakarta-ke-purwokerto/',
    price: 276000,
  },
  {
    name: 'Palembang → Lampung',
    image: '/explores/train-9.webp',
    url: '/kereta-api/dari-palembang-ke-lampung/',
    price: 32000,
  },
  {
    name: 'Yogyakarta → Bandung',
    image: '/explores/train-10.webp',
    url: '/kereta-api/dari-jogja-ke-bandung/',
    price: 144000,
  },
  {
    name: 'Surabaya → Yogyakarta',
    image: '/explores/train-11.webp',
    url: '/kereta-api/dari-surabaya-ke-jogja/',
    price: 144000,
  },
  {
    name: 'Yogyakarta → Malang',
    image: '/explores/train-12.webp',
    url: '/kereta-api/dari-jogja-ke-malang/',
    price: 144000,
  },
];

export const bus: Array<ExploreItem> = [
  {
    name: 'Jakarta → Bandung',
    image: '/explores/bus-1.webp',
    url: '/bus-travel/rute/jakarta-bandung',
    price: 50000,
  },
  {
    name: 'Bandung → Jakarta',
    image: '/explores/bus-2.webp',
    url: '/bus-travel/rute/bandung-jakarta',
    price: 50000,
  },
  {
    name: 'Lampung → Palembang',
    image: '/explores/bus-3.webp',
    url: '/bus-travel/rute/lampung-palembang',
    price: 265000,
  },
  {
    name: 'Jakarta → Semarang',
    image: '/explores/bus-4.webp',
    url: '/bus-travel/rute/jakarta-semarang',
    price: 135000,
  },
  {
    name: 'Surabaya → Malang',
    image: '/explores/bus-5.webp',
    url: '/bus-travel/rute/surabaya-malang',
    price: 25000,
  },
  {
    name: 'Malang → Surabaya',
    image: '/explores/bus-6.webp',
    url: '/bus-travel/rute/malang-surabaya',
    price: 25000,
  },
  {
    name: 'Bandung → Bogor',
    image: '/explores/bus-7.webp',
    url: '/bus-travel/rute/bandung-bogor',
    price: 90000,
  },
  {
    name: 'Palembang → Jambi',
    image: '/explores/bus-8.webp',
    url: '/bus-travel/rute/palembang-jambi',
    price: 250000,
  },
  {
    name: 'Jakarta → Cirebon',
    image: '/explores/bus-9.webp',
    url: '/bus-travel/rute/jakarta-cirebon',
    price: 120000,
  },
  {
    name: 'Semarang → Purwokerto',
    image: '/explores/bus-10.webp',
    url: '/bus-travel/rute/semarang-purwokerto',
    price: 145000,
  },
  {
    name: 'Pekanbaru → Padang',
    image: '/explores/bus-11.webp',
    url: '/bus-travel/rute/pekanbaru-padang',
    price: 250000,
  },
  {
    name: 'Bogor → Bandung',
    image: '/explores/bus-12.webp',
    url: '/bus-travel/rute/bogor-bandung',
    price: 90000,
  },
];
