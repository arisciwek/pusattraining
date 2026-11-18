# Agent Guidelines — Legacy Content Migration

## Research and historical training schedules

- Treat a legacy post's sitemap `lastmod` and publication/update dates as temporal anchors for research. They are clues for locating the nearest relevant training batches, not event dates themselves.
- Before drafting a legacy schedule or "siap jalan" article, crawl the original post and search the related individual training-program pages, archived announcements, and indexed copies. Do not stop at a failed crawl of the aggregate post when related source pages may still contain the schedule.
- Identify the training batches closest to and following the source post's publication/update date. Preserve the historically relevant upcoming dates and, where supported, the next batch dates. Explain the training subject and competency first, then describe the associated program and its historical schedule.
- Verify each date, month, year, venue, price, participant requirement, and program level against a source. Never invent missing details or silently mix dates from different years.
- Normalize obvious date-range notation only when the calendar and surrounding schedule entries support one unambiguous interpretation. For example, a source range written as `25–2 Februari 2019` in a February schedule can be rendered as `25 Februari–2 Maret 2019` when the calendar sequence confirms that it crosses into the next month. If the interpretation is not supported, omit that specific date rather than publishing malformed or speculative wording.
- Clearly label expired batches, venues, and prices as historical. Never present an old schedule, fee, or requirement as currently available. Link the CTA to the verified current training page or catalog.
- A crawler failure is a research limitation, not article content. Do not publish internal audit notes or process commentary such as "sumber tidak dapat diakses", "tidak berhasil diverifikasi", "crawler gagal", "rentang ambigu", "tidak dicantumkan karena...", or explanations of why the migration could not recover a source.
- If the original aggregate page cannot be retrieved, continue researching the related program pages and other credible contemporaneous sources. Build a useful subject-and-training article from facts that can be verified. Do not fabricate an old schedule to make the article look complete.
- Keep research caveats, source limitations, and unresolved questions in PR descriptions, audit CSV evidence fields, or internal documentation—not in public-facing article copy.
- Before opening a migration PR, review the final rendered copy for embarrassing editorial notes, malformed dates, unsupported historical claims, stale prices presented as current, and CTA links that do not exist.

## Public-facing content quality

- Write for the prospective participant or employer, not for the migration process. Public content must read as a finished, professionally edited article.
- Preserve the source URL's search intent while improving usefulness: explain the role, equipment, competency, or training subject; describe the related training; then provide a relevant next step.
- Keep article content in the repository's established frontmatter block format. Do not add ordinary Markdown body content or an `article-body` block unless the project architecture is explicitly changed.
