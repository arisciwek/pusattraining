# Component & Block Inventory

Status: implemented component and block foundation on `feat/training-design-system`. This inventory records the reusable patterns audited from `confinedspace` and `damkar`, then adapted for the Pusattraining portal and its Wahana Totalita-inspired visual direction.

> This branch currently contains the component layer and block contracts. It is not yet a complete runnable Astro application: the repository still needs its Astro project scaffold, content collections, global styles/tokens, and route integration before a full build can be run.

## Shared components

| Component | Responsibility | Status |
|---|---|---|
| Container | Consistent page width and horizontal gutters | Implemented |
| Button | Consistent links and actions | Implemented |
| SectionHeading | Section eyebrow, title, description and action | Implemented |
| Breadcrumb | Hierarchical navigation | Implemented |
| SiteHeader | Brand, primary navigation and responsive menu | Implemented |
| SiteFooter | Footer navigation and organization summary | Implemented |
| Badge | Small status/category label | Implemented |
| SearchField | Accessible search input | Implemented |
| EmptyState | No-result and no-schedule states | Implemented |
| Pagination | Navigable result pages | Implemented |
| FaqBlock | Expandable question and answer list | Implemented |
| BenefitsBlock | Benefit/value proposition grid | Implemented |
| ReasonsBlock | Reasons / differentiator list | Implemented |
| GalleryBlock | Responsive image gallery | Implemented |
| ImagePanel | Single editorial image with caption | Implemented |
| StatsGrid | Key metrics and proof points | Implemented |
| TestimonialGrid | Participant testimonials | Implemented |
| ComparisonTable | Responsive accessible comparison table | Implemented |
| ProcessTimeline | Ordered process / registration steps | Implemented |
| ChecklistCard | Checklist of requirements or preparation | Implemented |
| DocumentList | Supporting document/download links | Implemented |
| GlossaryBlock | Term and definition list | Implemented |
| NoteBlock | Info, warning and success callout | Implemented |
| SourceLinks | External references and source links | Implemented |
| ContactPanel | Contact channels and actions | Implemented |
| CtaBlock | Reusable conversion section | Implemented |
| Dropdown | Native disclosure menu | Implemented |
| Modal | Native dialog with open/close controls | Implemented |
| ArticleRelatedArticles | Related article teaser grid | Implemented |
| ArticlePreviousArticles | Previous article navigation | Implemented |

## Training components

| Component | Responsibility | Status |
|---|---|---|
| TrainingMeta | Certification, duration, method and organizer metadata | Implemented |
| TrainingCard | Summary card for one training program | Implemented |
| TrainingGrid | Responsive collection of TrainingCard | Implemented |
| TrainingCategoryChip | Category link / filter affordance | Implemented |
| TrainingSyllabus | Structured curriculum and topics | Implemented |
| TrainingRequirementList | Participant prerequisites | Implemented |
| TrainingFactList | Audience, outcome, duration and delivery facts | Implemented |
| ProgramGrid | Catalog-style grid of training programs | Implemented |
| MateriList | Compact numbered list of course material | Implemented |
| DetailTabs | Accessible tabbed information panels | Implemented |

## Schedule components

| Component | Responsibility | Status |
|---|---|---|
| ScheduleMeta | Date, method, location, duration and status metadata | Implemented |
| ScheduleCard | One concrete batch | Implemented |
| ScheduleList | Responsive collection of batches | Implemented |
| ScheduleStatus | Open, limited, closed and completed states | Implemented |
| ScheduleMonthHeading | Month/year title and previous/next navigation | Implemented |
| ScheduleFilter | Month and category filter form | Implemented |
| ScheduleTable | Dense schedule listing with semantic table markup | Implemented |
| ScheduleCalendar | Month calendar grid with linked schedule entries | Implemented |

## Content components

| Component | Responsibility | Status |
|---|---|---|
| ArticleCard | Editorial teaser card | Implemented |
| ArticleGrid | Responsive article listing | Implemented |
| LatestArticlesSection | Latest editorial content section | Implemented |

## Block architecture

The renderer is intentionally data-driven. A page can provide an ordered `PageBlock[]` configuration and `BlockRenderer.astro` resolves each known type through `registry.ts`. Add a new block type only after its component and props contract exist.

Current block types:
- `program-grid`
- `benefits`
- `reasons`
- `faq`
- `gallery`
- `timeline`
- `stats`
- `cta`
- `testimonials`

### Home blocks

- HomeHero
- TrustSignals
- TrainingCategoryOverview
- FeaturedTraining
- UpcomingSchedule
- WhyChooseUs
- LatestArticles
- ContactCTA

### Training blocks

- TrainingOverview
- RelatedTraining
- Training syllabus and requirements components
- ProgramGrid / DetailTabs

### Schedule blocks

- ScheduleOverview
- ScheduleCalendar
- ScheduleFilter
- ScheduleTable
- ScheduleList

## Patterns carried forward from the reference repositories

From Confinedspace:
- Reusable content blocks for FAQ, gallery, tables, notes, checklists, process timelines, stats, testimonials, glossary and source references.
- Related and previous article navigation.
- Clear separation between shared components and page/domain blocks.

From Damkar:
- A typed block contract and registry-driven renderer.
- Dedicated components for training/program detail, tabs, learning materials and schedule presentation.
- Progressive enhancement for interactive controls; semantic HTML remains useful without JavaScript where practical.

## Still to implement / integrate

- [ ] Astro application scaffold and package scripts.
- [ ] Global Tailwind setup, design tokens and responsive component styling.
- [ ] Content collection schemas for training, schedules, articles and categories.
- [ ] Search/filter behavior connected to real content data.
- [ ] Page layouts and route integration for home, training catalog, training detail, schedule index/month and schedule detail.
- [ ] JSON-LD, metadata, sitemap and robots configuration.
- [ ] Full keyboard, responsive and reduced-motion QA.
- [ ] Production build and link validation after the scaffold is in place.

## Naming and markup rules

- Component filenames use PascalCase.
- Block directories group by page/domain; reusable primitives live in `components/shared`.
- Use semantic classes prefixed by role, for example `site-header__nav`, `training-card__title`, `schedule-calendar__day`.
- Use links for navigation and buttons for actions.
- Keep dates machine-readable with `time` elements and ISO datetime values.
- Cards should not contain nested interactive controls inside a wrapping anchor. Use a clear primary link plus separate action links.
- Use semantic landmarks and accessible names; interactive controls must expose state with ARIA where appropriate.
- Repeated collections should use stable IDs/slugs in their source data.
- Keep visual styling in Tailwind/global design tokens; do not add a second CSS framework.
