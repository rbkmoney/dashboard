import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

import { isCurrentYear } from './get-date-range-current-type';
import { getLocalizedDate } from './get-localized-date';

/**
 * 2 января
 * 2 января 2020
 *
 * Со 2 по 8 марта / Со 2 января по 8 марта
 * Со 2 по 8 марта 2019 / Со 2 января 2019 по 8 марта 2020
 */
export function getLocalizedDayRange(
    dateRange: DateRange<Moment>,
    t: Record<'from' | 'to' | 'fromStartWith2', string>,
    locale: string
): string {
    const { start, end } = dateRange;
    const startStr = getLocalizedDate(
        start,
        { d: true, m: !start.isSame(end, 'month'), y: !start.isSame(end, 'year') },
        locale
    );
    const endStr = getLocalizedDate(end, { d: true, m: true, y: !isCurrentYear(dateRange) }, locale);
    if (start.isSame(end, 'day')) return endStr;
    return `${start.date() === 2 ? t.fromStartWith2 : t.from} ${startStr} ${t.to} ${endStr}`;
}
