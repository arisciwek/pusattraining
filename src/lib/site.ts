export const SITE_NAME = 'Pusat Training';
export const COMPANY_NAME = 'PT Betracom Gemilang Nusa';

export const COMPANY_URL = 'https://pusattrainingk3.com';
export const COMPANY_EMAIL = 'betracomtraining@gmail.com';

export const DEFAULT_EVENT_LOCATION = {
  name: 'Betracom Arena Training Center',
  address: 'Jl Raya Cifor, Cilubang Tonggoh, RT 01 RW 10, Kelurahan Situ Gede',
  city: 'Bogor Barat, Kota Bogor',
  province: 'Jawa Barat',
  postalCode: '16115',
  countryCode: 'ID',
  mapsUrl: 'https://maps.app.goo.gl/CeEEBXuvHc6VVeVQA',
} as const;

export const COMPANY_ADDRESS = {
  street: 'Grand Slipi Tower Lt. 9',
  road: 'Jl. Letjen S. Parman',
  city: 'Jakarta Barat',
  region: 'DKI Jakarta',
  country: 'Indonesia',
} as const;

/** Data organisasi untuk footer, metadata, dan structured data. */
export const ORGANIZATION = {
  name: COMPANY_NAME,
  alternateName: 'Betracom',
  url: COMPANY_URL,
  email: COMPANY_EMAIL,
  address: COMPANY_ADDRESS,
} as const;
