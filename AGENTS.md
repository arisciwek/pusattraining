# Repository Instructions

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
