export interface BlockImage { src: string; alt: string; caption?: string; }
export interface TrainingCategoryPageBlock { type: 'training-category'; eyebrow?: string; sectionTitle: string; sectionDescription?: string; emptyMessage: string; }
export interface TrainingCatalogPageBlock { type: 'training-catalog'; eyebrow?: string; title: string; description: string; emptyMessage?: string; categoryTitle: string; categoryDescription?: string; }
export interface ScheduleIndexPageBlock { type: 'schedule-index'; eyebrow?: string; sectionEyebrow?: string; latestTitle: string; archiveTitle: string; emptyTitle: string; emptyDescription: string; emptyActionLabel: string; }
export interface TrainingPageBlock { type: 'program-grid'; title?: string; description?: string; programs: { title: string; description: string; href: string; category?: string }[]; }
export interface BenefitsPageBlock { type: 'benefits'; title: string; description?: string; items: { title: string; description: string; icon?: string }[]; }
export interface ReasonsPageBlock { type: 'reasons'; title: string; description?: string; items: { title: string; text: string }[]; }
export interface FaqPageBlock { type: 'faq'; id?: string; title?: string; description?: string; items: { question: string; answer: string }[]; }
export interface GalleryPageBlock { type: 'gallery'; title?: string; description?: string; items: BlockImage[]; }
export interface TimelinePageBlock { type: 'timeline'; title?: string; items: { title: string; description: string }[]; }
export interface StatsPageBlock { type: 'stats'; items: { value: string; label: string; note?: string }[]; }
export interface CtaPageBlock { type: 'cta'; eyebrow?: string; title: string; description?: string; actionLabel: string; actionHref: string; secondaryLabel?: string; secondaryHref?: string; }
export interface TestimonialPageBlock { type: 'testimonials'; title?: string; items: { quote: string; name: string; role?: string; organization?: string }[]; }
export type PageBlock = TrainingCategoryPageBlock | TrainingCatalogPageBlock | ScheduleIndexPageBlock | TrainingPageBlock | BenefitsPageBlock | ReasonsPageBlock | FaqPageBlock | GalleryPageBlock | TimelinePageBlock | StatsPageBlock | CtaPageBlock | TestimonialPageBlock;

export interface TrainingDetailIntroBlock {
  type: 'training-detail-intro';
  eyebrow?: string;
  noticeTitle: string;
  noticeDescription: string;
}
export interface TrainingSummaryBlock {
  type: 'training-summary';
  id?: string;
  eyebrow?: string;
  items: { label: string; value: string; detail?: string }[];
}
export interface TrainingContentSectionBlock {
  type: 'training-content-section';
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: { title: string; description?: string }[];
}
export interface TrainingFaqBlock {
  type: 'training-faq';
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: { question: string; answer: string }[];
}
export interface TrainingCtaBlock {
  type: 'training-cta';
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}
export interface TrainingScheduleListBlock {
  type: 'training-schedule-list';
  id?: string;
  eyebrow?: string;
  title: string;
  allLabel?: string;
  emptyMessage: string;
}
export type TrainingDetailBlock =
  | TrainingDetailIntroBlock
  | TrainingSummaryBlock
  | TrainingContentSectionBlock
  | TrainingFaqBlock
  | TrainingCtaBlock
  | TrainingScheduleListBlock;

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
