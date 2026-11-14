# Component & Block Inventory

Status: planned inventory for the first implementation pass.

## Shared components

| Component | Responsibility | Key props / behavior |
|---|---|---|
| SiteHeader | Brand, primary navigation, search/CTA | navigation items, active path; mobile menu |
| SiteFooter | Footer navigation and organization summary | link groups, contact, legal text |
| Container | Consistent page width and horizontal gutters | as, size |
| Button | Consistent links and buttons | href/type, variant, size |
| Breadcrumb | Hierarchical navigation | items |
| SectionHeading | Section eyebrow, title, description, action | eyebrow, title, description, link |
| SearchField | Accessible search input | label, name, value, placeholder |
| EmptyState | No-result and no-schedule states | title, description, action |
| Pagination | Navigable result pages | current page, total pages, base URL |

## Training components

| Component | Responsibility |
|---|---|
| TrainingCard | Summary card for one training program |
| TrainingMeta | Certification, duration, method, organizer metadata |
| TrainingCategoryChip | Category link / filter affordance |
| TrainingGrid | Responsive collection of TrainingCard |
| TrainingSearch | Search and category controls |
| TrainingSyllabus | Structured curriculum / topics |
| TrainingRequirementList | Participant prerequisites |
| TrainingFactList | Audience, outcome, duration, delivery methods |

## Schedule components

| Component | Responsibility |
|---|---|
| ScheduleCard | One concrete batch |
| ScheduleMeta | Date, method, location, duration, price/status |
| ScheduleList | Responsive collection of batches |
| ScheduleTable | Dense desktop schedule listing with mobile alternative |
| ScheduleMonthHeading | Month/year title and navigation |
| ScheduleFilter | Month, category, delivery mode filters |
| ScheduleStatus | Available, limited, closed, completed status |

## Page blocks

### Home
- HomeHero
- TrustSignals
- TrainingCategoryOverview
- FeaturedTraining
- TrainingSearchBlock
- UpcomingSchedule
- WhyChooseUs
- ClientLogos
- TrainingGallery
- LatestArticles
- FrequentlyAskedQuestions
- ContactCTA

### Training index
- TrainingPageHero
- TrainingCategoryNav
- TrainingCatalog
- TrainingCatalogCTA

### Training detail
- TrainingDetailHero
- TrainingOverview
- TrainingAudience
- TrainingSyllabusBlock
- TrainingRequirements
- TrainingFacilities
- RelatedSchedules
- RelatedTraining
- TrainingFAQ

### Schedule index
- SchedulePageHero
- ScheduleCalendar
- ScheduleFilters
- ScheduleResults
- ScheduleCTA

### Schedule detail (optional route)
- ScheduleDetailHero
- ScheduleInformation
- ScheduleRegistration
- ScheduleRelatedTraining

## Initial implementation order

1. Design tokens and global base styles.
2. Container, Button, SectionHeading, Breadcrumb, SearchField.
3. SiteHeader and SiteFooter.
4. TrainingMeta, TrainingCard, TrainingGrid.
5. ScheduleMeta, ScheduleCard, ScheduleList.
6. Home blocks.
7. Training catalog/detail blocks.
8. Schedule index/detail blocks.
9. Interaction scripts and responsive/accessibility pass.

## Naming and markup rules

- Component filenames use PascalCase.
- Block directories group by page/domain.
- Use semantic classes prefixed by role, for example site-header, training-card, schedule-card, section-heading.
- Use links for navigation and buttons for actions.
- Keep dates machine-readable with time elements and ISO datetime values.
- Cards should not contain nested interactive controls inside a wrapping anchor. Use a clear primary link plus separate action links.
- All repeated collections use stable IDs/slugs as keys in data mapping.
