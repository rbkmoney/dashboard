import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

import { capitalizeFirstLetter } from './capitilize-first-letter';
import { isCurrentYear } from './get-date-range-current-type';
import { isMonth } from './get-date-range-type';
import { getLocalizedDate } from './get-localized-date';

/**
 * Январь
 * Январь 2020
 *
 * С января по март
 * С января 2019 по март 2019 / С декабря 2019 по март 2020
 */
export function getLocalizedMonthRange(
    dateRange: DateRange<Moment>,
    t: Record<'from' | 'to', string>,
    locale: string
): string {
    const currentYear = isCurrentYear(dateRange);
    const startStr = getLocalizedDate(dateRange.start, { m: true, y: !currentYear }, locale);
    const endStr = getLocalizedDate(dateRange.end, { m: true, y: !currentYear }, locale, true);
    if (isMonth(dateRange)) return capitalizeFirstLetter(endStr);
    return `${t.from} ${startStr} ${t.to} ${endStr}`;
}
