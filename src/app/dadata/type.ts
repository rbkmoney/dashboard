export const TYPE = ['address', 'party', 'bank', 'fio', 'fmsUnit', 'okved'] as const;
export type Type = typeof TYPE[number];
