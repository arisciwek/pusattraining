export interface BlockImage { src: string; alt: string; caption?: string; }
export interface TrainingCategoryPageBlock { type: 'training-category'; eyebrow?: string; sectionTitle: string; sectionDescription?: string; emptyMessage: string; }
export interface TrainingCatalogPageBlock { type: 'training-catalog'; eyebrow?: string; title: string; description: string; emptyMessage?: string; categoryTitle: string; categoryDescription?: string; }
export interface TrainingPageBlock { type: 'program-grid'; title?: string; description?: string; programs: { title: string; description: string; href: string; category?: string }[]; }
export interface BenefitsPageBlock { type: 'benefits'; title: string; description?: string; items: { title: string; description: string; icon?: string }[]; }
export interface ReasonsPageBlock { type: 'reasons'; title: string; description?: string; items: { title: string; text: string }[]; }
export interface FaqPageBlock { type: 'faq'; id?: string; title?: string; description?: string; items: { question: string; answer: string }[]; }
export interface GalleryPageBlock { type: 'gallery'; title?: string; description?: string; items: BlockImage[]; }
export interface TimelinePageBlock { type: 'timeline'; title?: string; items: { title: string; description: string }[]; }
export interface StatsPageBlock { type: 'stats'; items: { value: string; label: string; note?: string }[]; }
export interface CtaPageBlock { type: 'cta'; eyebrow?: string; title: string; description?: string; actionLabel: string; actionHref: string; secondaryLabel?: string; secondaryHref?: string; }
export interface TestimonialPageBlock { type: 'testimonials'; title?: string; items: { quote: string; name: string; role?: string; organization?: string }[]; }
export type PageBlock = TrainingCategoryPageBlock | TrainingCatalogPageBlock | TrainingPageBlock | BenefitsPageBlock | ReasonsPageBlock | FaqPageBlock | GalleryPageBlock | TimelinePageBlock | StatsPageBlock | CtaPageBlock | TestimonialPageBlock;

export interface HomeHeroBlock {
  type: 'home-hero';
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  proofPoints?: string[];
}
export interface HomeIntroductionBlock {
  type: 'home-introduction';
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}
export interface HomeCategoryOverviewBlock {
  type: 'home-category-overview';
  eyebrow?: string;
  title: string;
  description?: string;
  limit?: number;
}
export interface HomeBenefitsBlock {
  type: 'home-benefits';
  title: string;
  description?: string;
  items: { title: string; description: string; icon?: string }[];
}
export interface HomeUpcomingScheduleBlock {
  type: 'home-upcoming-schedule';
  title?: string;
  description?: string;
  allHref?: string;
}
export interface HomeContactBlock {
  type: 'home-contact';
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}
export type HomePageBlock = HomeHeroBlock | HomeIntroductionBlock | HomeCategoryOverviewBlock | HomeBenefitsBlock | HomeUpcomingScheduleBlock | HomeContactBlock;
