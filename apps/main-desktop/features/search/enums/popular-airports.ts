import type { LocationSearchItem } from 'search-module/types/search-types';

const popularAirportsData: Array<LocationSearchItem> = [
  {
    title: 'Jakarta',
    description: 'Semua Bandara - JKT',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'JKT',
    payload: {
      cityName: 'Kota Jakarta',
    },
  },
  {
    title: 'Surabaya',
    description: 'Semua Bandara - SUB',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'SUB',
  },
  {
    title: 'Bali',
    description: 'Semua Bandara - DPS',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'DPS',
  },
  {
    title: 'Medan',
    description: 'Semua Bandara - KNO',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'KNO',
  },
  {
    title: 'Makassar',
    description: 'Semua Bandara - UPG',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'UPG',
  },
  {
    title: 'Jogja',
    description: 'Semua Bandara - YKIA',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'YKIA',
    payload: {
      cityName: 'Yogyakarta',
    },
  },
  {
    title: 'Batam',
    description: 'Semua Bandara - BTH',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'BTH',
  },
  {
    title: 'Balikpapan',
    description: 'Semua Bandara - BPN',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'BPN',
  },
  {
    title: 'Pekanbaru',
    description: 'Semua Bandara - PKU',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'PKU',
  },
  {
    title: 'Padang',
    description: 'Semua Bandara - PDG',
    type: 'Kota',
    icon: '/icon-location-city.svg',
    value: 'PDG',
  },
];

export default popularAirportsData;
