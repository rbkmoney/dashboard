import { DateRange } from '@angular/material/datepicker';
import { Moment } from 'moment';

/**
 * 2020 год
 * С 2019 по 2020 год
 */
export function getLocalizedYearRange(
    { start, end }: DateRange<Moment>,
    t: Record<'from' | 'to' | 'year', string>
): string {
    const endStr = `${end.year()} ${t.year}`;
    if (start.isSame(end, 'year')) return endStr;
    return `${t.from} ${start.year()} ${t.to} ${endStr}`;
}
