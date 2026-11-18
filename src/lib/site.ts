export const SITE_NAME = 'Pusat Training';
export const COMPANY_NAME = 'PT Betracom Gemilang Nusa';

export const COMPANY_URL = 'https://betracom.co.id/';
export const COMPANY_EMAIL = 'betracomtraining@gmail.com';

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
