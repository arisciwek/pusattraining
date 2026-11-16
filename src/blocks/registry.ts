import BenefitsBlock from '../components/shared/BenefitsBlock.astro';
import ReasonsBlock from '../components/shared/ReasonsBlock.astro';
import FaqBlock from '../components/shared/FaqBlock.astro';
import GalleryBlock from '../components/shared/GalleryBlock.astro';
import ProcessTimeline from '../components/shared/ProcessTimeline.astro';
import StatsGrid from '../components/shared/StatsGrid.astro';
import CtaBlock from '../components/shared/CtaBlock.astro';
import TestimonialGrid from '../components/shared/TestimonialGrid.astro';
import ProgramGrid from '../components/content/ProgramGrid.astro';
import TrainingCatalog from './training/TrainingCatalog.astro';
import TrainingCategoryPage from './training/TrainingCategoryPage.astro';
import type { PageBlock } from './types';

export const blockRegistry = {
  'training-category': TrainingCategoryPage,
  'training-catalog': TrainingCatalog,
  'program-grid': ProgramGrid,
  benefits: BenefitsBlock,
  reasons: ReasonsBlock,
  faq: FaqBlock,
  gallery: GalleryBlock,
  timeline: ProcessTimeline,
  stats: StatsGrid,
  cta: CtaBlock,
  testimonials: TestimonialGrid,
} satisfies Record<PageBlock['type'], unknown>;