import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Moment } from 'moment';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

export type Type = 'week' | 'month' | 'year';

@Pipe({ name: 'rangeDate' })
export class RangeDatePipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {}

    transform({ begin, end }: { begin: Moment; end: Moment }, _type?: Type): string {
        const current = moment();

        if (begin.isSame(current.startOf('week'), 'day') && end.isSame(current.endOf('week'), 'day')) {
            return this.rangeDateTranslate('currentWeek');
        }

        const isSameMonth = begin.isSame(end, 'month');
        const isSameYear = begin.isSame(end, 'year');
        const isCurrentYear = current.isSame(begin, 'year') && current.isSame(end, 'year');

        if (isSameYear && begin.isSame(begin.clone().startOf('year')) && end.isSame(end.clone().endOf('year'))) {
            return this.localizedFormatDate(begin, 'y');
        }

        const fromStr = this.rangeDateTranslate('from');
        const toStr = this.rangeDateTranslate('to');
        if (begin.isSame(begin.clone().startOf('month'), 'day') && end.isSame(end.clone().endOf('month'), 'day')) {
            if (isSameMonth) {
                return this.capitalizeFirstLetter(this.localizedFormatDate(begin, isCurrentYear ? 'LLLL' : 'LLLL y'));
            }
            return (
                `${fromStr} ${this.localizedFormatDate(begin, isSameYear ? 'MMMM' : 'LLLL y')}` +
                ` ${toStr} ${this.localizedFormatDate(end, 'LLLL y')}`
            );
        }

        const fromByDayStr = this.rangeDateTranslate(begin.day() === 2 ? 'fromStartWith2' : 'from');
        if (isSameMonth) {
            return (
                `${fromByDayStr} ${this.localizedFormatDate(begin, 'd')}` +
                ` ${toStr} ${this.localizedFormatDate(end, isCurrentYear ? 'd MMMM' : 'd MMMM y')}`
            );
        }
        return (
            `${fromByDayStr} ${this.localizedFormatDate(begin, isCurrentYear ? 'd MMMM' : 'd MMMM y')}` +
            ` ${toStr} ${this.localizedFormatDate(end, isCurrentYear ? 'd MMMM' : 'd MMMM y')}`
        );
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    rangeDateTranslate(key: string) {
        return this.transloco.translate(`rangeDate.${key}`, null, 'range-datepicker|scoped');
    }

    localizedFormatDate(date: Moment, format: string) {
        return formatDate(date.toDate(), format, this.locale);
    }
}
