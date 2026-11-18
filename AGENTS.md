# Repository Instructions

## Content types: articles and brochures

- Treat `docs/ARTICLE-AND-BROCHURE-CONTENT-CONTRACT.md` as the migration and implementation source of truth for distinguishing editorial articles from promotional brochures.
- Use `type: article` for educational/editorial content; use `type: brochure` for a program offer designed to help visitors evaluate and register for training.
- Do not classify content solely by its legacy filename, length, or whether it previously appeared as a PDF/image. Classify by purpose and substance.
- A brochure must relate to its master training through `trainingId`. Schedules also relate to the same master through `trainingId`; retrieve related schedules dynamically by matching that identifier.
- Do not normally add `scheduleId` or `scheduleIds` to brochure frontmatter and do not duplicate operational schedule facts there. A brochure describes a training program; a schedule describes one specific delivery/batch.
- If legacy content describes one specific batch with dates and operational details, migrate it as a schedule according to `docs/FRONTMATTER-SCHEDULE-CONTRACT.md`, not as a brochure.
- Keep article and brochure page structures, calls to action, Open Graph types, and JSON-LD appropriate to their distinct purposes.
- Never invent missing program, certification, price, duration, prerequisite, venue, or schedule facts during migration.
- When a brochure's `trainingId` cannot be confidently mapped to an existing master training, record it as an unresolved migration mapping; do not guess.

## Training detail pages

- Treat `src/content/trainings/*.md` as the source of truth for each training detail page.
- Keep the official training name consistent across the training record, hero heading, breadcrumb, cards, and page metadata.
- Whenever a training defines a `hero` object, `HeroTraining.astro` renders its description as `<p class="hero-training__summary">`.
- **Every rendered `p.hero-training__summary` must contain the complete training name from that record's top-level `title` field in its opening sentence, followed by the word `adalah`.** The full name must appear before `adalah`; an abbreviation, class shorthand, or implied context is not sufficient.
- Use a clear opening such as: `Pelatihan [nama pelatihan] adalah ...`, followed by a useful explanation of the audience, scope, or outcome.
- The validator checks the opening sentence, not merely whether the name appears somewhere later in the paragraph.
- If `hero.description` is omitted, the fallback `description` field must still contain the complete training name.
- The content validator in `src/lib/validate-content.ts` enforces this rule during static page generation. Do not weaken or bypass the validation to accommodate incomplete copy; fix the training content instead.
- Do not add unverified claims, certification details, durations, prices, prerequisites, or schedule information merely to complete the summary.

## Training change workflow

- Review the existing training data and relevant source repository before editing a training.
- Keep each individual training revision isolated: one training per commit and pull request.
- Do not modify shared components as part of an individual training-content commit unless the task explicitly requires it.
- Run the relevant checks when a local environment is available, and report checks that could not be run.
