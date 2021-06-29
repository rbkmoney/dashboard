export const DATE_RANGE_WORDS = ['from', 'fromStartWith2', 'to', 'today', 'currentWeek', 'year'] as const;

export type DateRangeTranslations = { [K in typeof DATE_RANGE_WORDS[number]]: string };
