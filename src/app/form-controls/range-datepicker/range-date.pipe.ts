import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Moment } from 'moment';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

@Pipe({ name: 'rangeDate' })
export class RangeDatePipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {}

    transform({ begin, end }: { begin: Moment; end: Moment }, _format?: 'year' | '3month' | 'month' | 'week'): string {
        const rangeDateTranslate = (key: string) =>
            this.transloco.translate(`rangeDate.${key}`, null, 'range-datepicker|scoped');
        const localizedFormatDate = (date: Moment, format: string) => formatDate(date.toDate(), format, this.locale);
        const current = moment();

        // 'Текущая неделя'
        if (begin.isSame(current.startOf('week'), 'day') && end.isSame(current.endOf('week'), 'day')) {
            return 'Текущая неделя';
        }

        const isSameMonth = begin.isSame(end, 'month');
        const isSameYear = begin.isSame(end, 'year');
        const isCurrentYear = current.isSame(begin, 'year') && current.isSame(end, 'year');

        if (isSameYear && begin.isSame(begin.clone().startOf('year')) && end.isSame(end.clone().endOf('year'))) {
            return localizedFormatDate(begin, 'y');
        }

        const fromStr = rangeDateTranslate('from');
        const toStr = rangeDateTranslate('to');
        if (begin.isSame(begin.clone().startOf('month'), 'day') && end.isSame(end.clone().endOf('month'), 'day')) {
            if (isSameMonth) {
                return this.capitalizeFirstLetter(localizedFormatDate(begin, isCurrentYear ? 'LLLL' : 'LLLL y'));
            }
            return (
                `${fromStr} ${localizedFormatDate(begin, isSameYear ? 'MMMM' : 'LLLL y')}` +
                ` ${toStr} ${localizedFormatDate(end, 'LLLL y')}`
            );
        }

        const fromByDayStr = rangeDateTranslate(begin.day() === 2 ? 'fromStartWith2' : 'from');
        if (isSameMonth) {
            return (
                `${fromByDayStr} ${localizedFormatDate(begin, 'd')}` +
                ` ${toStr} ${localizedFormatDate(end, isCurrentYear ? 'd MMMM' : 'd MMMM y')}`
            );
        }
        return (
            `${fromByDayStr} ${localizedFormatDate(begin, isCurrentYear ? 'd MMMM' : 'd MMMM y')}` +
            ` ${toStr} ${localizedFormatDate(end, isCurrentYear ? 'd MMMM' : 'd MMMM y')}`
        );
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
