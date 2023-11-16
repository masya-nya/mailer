export const QUERY_FILTERS = ['seen', 'all', 'flagged'] as const;

export type QueryFilters = (typeof QUERY_FILTERS)[number];
