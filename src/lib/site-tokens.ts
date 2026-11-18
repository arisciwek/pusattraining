import { COMPANY_NAME, SITE_NAME } from './site';

const SITE_TOKENS: Record<string, string> = {
  COMPANY_NAME,
  SITE_NAME,
};

/** Resolve placeholders used by Markdown content and frontmatter data. */
export function resolveSiteTokens(value: string): string {
  return value.replace(/\{\{([A-Z_]+)\}\}/g, (token, key: string) => SITE_TOKENS[key] ?? token);
}

/** Resolve placeholders recursively in page frontmatter and block data. */
export function resolveSiteTokensDeep<T>(value: T): T {
  if (typeof value === 'string') return resolveSiteTokens(value) as T;
  if (Array.isArray(value)) return value.map((item) => resolveSiteTokensDeep(item)) as T;

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveSiteTokensDeep(item)]),
    ) as T;
  }

  return value;
}

/** Remark plugin: replace site placeholders in rendered Markdown text nodes. */
export function remarkSiteTokens() {
  return (tree: { children?: unknown[] }) => {
    const visit = (node: unknown): void => {
      if (!node || typeof node !== 'object') return;
      const current = node as { type?: string; value?: unknown; children?: unknown[] };

      if (current.type === 'text' && typeof current.value === 'string') {
        current.value = resolveSiteTokens(current.value);
      }

      current.children?.forEach(visit);
    };

    visit(tree);
  };
}
