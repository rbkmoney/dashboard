import { formatDate } from '@angular/common';
import { Moment } from 'moment';

type Parts = Partial<Record<'d' | 'm' | 'y', boolean>>;

export function getLocalizedDate(date: Moment, { d, m, y }: Parts, locale: string, standalone = false): string {
    return formatDate(
        date.toDate(),
        [d && 'd', m && standalone ? 'LLLL' : 'MMMM', y && 'y'].filter((v) => v).join(' '),
        locale
    );
}
