export const type = ['address', 'party', 'bank', 'fio', 'fmsUnit', 'okved'] as const;
export type Type = typeof type[number];
