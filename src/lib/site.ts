export const SITE_NAME = 'Pusat Training';
export const COMPANY_NAME = 'PT Betracom Gemilang Nusa';

export const COMPANY_URL = 'https://pusattrainingk3.com';
export const COMPANY_PROFILE_URL = 'https://betracom.co.id';
export const COMPANY_EMAIL = 'betracomtraining@gmail.com';

export const COMPANY_LEGALITY = {
  deed: {
    label: 'Akta pendirian',
    value: 'Akta Notaris Dea Novia Sari, S.H., M.Kn. Nomor 65',
    date: '12 Agustus 2022',
  },
  nib: '1808220007141',
  npwp: '60.648.770.0-031.000',
  established: '12 Agustus 2022',
  establishedYear: '2022',
} as const;

export const COMPANY_OFFICES = [
  {
    id: 'jakarta',
    label: 'Kantor Pusat',
    name: 'Grand Slipi Tower',
    address: 'Grand Slipi Tower Lt. 9 Unit O, CHR Office, Jl. Letjen S. Parman Kav. 22–24, RT 001/RW 004, Kelurahan Palmerah, Kecamatan Palmerah, Jakarta Barat, DKI Jakarta 11480.',
    city: 'Jakarta Barat',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Slipi+Tower+Jakarta',
  },
  {
    id: 'bogor',
    label: 'Training Center',
    name: 'Betracom Arena Training Center (BATC)',
    address: 'Jl. Raya Cifor, Cilubang Tonggoh, RT 01/RW 10, Kelurahan Situ Gede, Kecamatan Bogor Barat, Kota Bogor, Jawa Barat 16115.',
    city: 'Bogor',
    mapsUrl: 'https://maps.app.goo.gl/CeEEBXuvHc6VVeVQA',
  },
] as const;

export const COMPANY_VISION = [
  'Menjadi perusahaan jasa Keselamatan dan Kesehatan Kerja yang berkontribusi dalam menciptakan lingkungan kerja yang aman dan tenaga kerja yang memahami keselamatan dalam bekerja.',
  'Menjadi perusahaan jasa yang berkontribusi terhadap program-program pemerintah di bidang ketenagakerjaan, K3, dan bidang lainnya.',
  'Menjadi perusahaan jasa yang unggul dalam berbagai aspek.',
] as const;

export const COMPANY_MISSION = [
  'Menyelenggarakan kegiatan pembinaan K3 dan bidang lainnya dengan mengedepankan layanan prima bagi klien.',
  'Menjalin kerja sama dengan perusahaan lain berdasarkan prinsip saling memberikan manfaat.',
  'Meningkatkan kapabilitas karyawan agar kompeten di bidangnya dan mampu memberikan pelayanan terbaik.',
] as const;

export const COMPANY_SERVICES = [
  {
    title: 'Pelatihan K3 Kemnaker RI',
    description: 'Program pembinaan dan pelatihan keselamatan dan kesehatan kerja sesuai ruang lingkup program yang tersedia.',
    href: '/pelatihan/',
  },
  {
    title: 'Sertifikasi BNSP',
    description: 'Program pengembangan kompetensi dan sertifikasi profesi melalui skema yang tersedia.',
    href: '/pelatihan/',
  },
  {
    title: 'Pelatihan Internal',
    description: 'Pelatihan yang dapat disesuaikan dengan kebutuhan dan karakteristik perusahaan.',
    href: '/pelatihan/',
  },
  {
    title: 'Konsultasi K3 / HSE',
    description: 'Dukungan konsultasi untuk kebutuhan keselamatan dan kesehatan kerja di lingkungan perusahaan.',
    href: '/kontak/',
  },
] as const;

export const COMPANY_NETWORK = [
  { name: 'Pusat Training', url: 'https://pusattrainingk3.com', description: 'Portal informasi program dan jadwal pelatihan.' },
  { name: 'Betracom Training', url: 'https://betracomtraining.com', description: 'Informasi layanan dan kegiatan pelatihan Betracom.' },
  { name: 'Pusdiklat K3', url: 'https://pusdiklatk3.com', description: 'Informasi pelatihan dan pengembangan kompetensi K3.' },
  { name: 'K3 Umum', url: 'https://k3umum.co.id', description: 'Informasi pelatihan dan sertifikasi Ahli K3 Umum.' },
] as const;

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
  street: 'Grand Slipi Tower Lt. 9 Unit O, CHR Office',
  road: 'Jl. Letjen S. Parman Kav. 22–24',
  city: 'Jakarta Barat',
  region: 'DKI Jakarta',
  country: 'Indonesia',
  postalCode: '11480',
} as const;

/** Data organisasi untuk footer, metadata, dan structured data. */
export const ORGANIZATION = {
  name: COMPANY_NAME,
  alternateName: 'Betracom',
  url: COMPANY_URL,
  email: COMPANY_EMAIL,
  address: COMPANY_ADDRESS,
  legalName: COMPANY_NAME,
  taxID: COMPANY_LEGALITY.npwp,
  identifier: COMPANY_LEGALITY.nib,
} as const;
