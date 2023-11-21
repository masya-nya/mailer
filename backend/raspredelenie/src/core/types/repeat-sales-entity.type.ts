export const REPEAT_ENTITIES = ['contact', 'company'] as const;
export type RepeatEntityType = (typeof REPEAT_ENTITIES)[number];
