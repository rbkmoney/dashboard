import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Moment } from 'moment';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

@Pipe({ name: 'rangeDate' })
export class RangeDatePipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {}

    transform({ begin, end }: { begin: Moment; end: Moment }): string {
        if (begin.isSame(begin.clone().startOf('year'), 'day') && end.isSame(end.clone().endOf('year'), 'day')) {
            return this.toYearStr(begin, end);
        }
        if (begin.isSame(begin.clone().startOf('month'), 'day') && end.isSame(end.clone().endOf('month'), 'day')) {
            return this.toMonthStr(begin, end);
        }
        if (begin.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day')) {
            return this.rangeDateTranslate('currentWeek');
        }
        return this.toDateStr(begin, end);
    }

    /**
     * 2020 год
     * С 2019 по 2020 год
     */
    private toYearStr(begin: Moment, end: Moment) {
        const endStr = `${end.year()} ${this.rangeDateTranslate('year')}`;

        if (begin.isSame(end, 'year')) {
            return endStr;
        }

        const fromStr = this.rangeDateTranslate('from');
        const toStr = this.rangeDateTranslate('to');

        return `${fromStr} ${begin.year()} ${toStr} ${endStr}`;
    }

    /**
     * Январь
     * Январь 2020
     *
     * С января по март
     * С января 2019 по март 2019 / С декабря 2019 по март 2020
     */
    private toMonthStr(begin: Moment, end: Moment) {
        const fromStr = this.rangeDateTranslate('from');
        const toStr = this.rangeDateTranslate('to');

        const currentYear = this.isCurrentYear(begin, end);
        const beginStr = this.formatDate(begin, false, true, !currentYear);
        const endStr = this.formatStandaloneDate(end, false, true, !currentYear);

        if (begin.isSame(end, 'month')) {
            return this.capitalizeFirstLetter(endStr);
        }

        return `${fromStr} ${beginStr} ${toStr} ${endStr}`;
    }

    /**
     * 2 января
     * 2 января 2020
     *
     * Со 2 по 8 марта / Со 2 января по 8 марта
     * Со 2 по 8 марта 2019 / Со 2 января 2019 по 8 марта 2020
     */
    private toDateStr(begin: Moment, end: Moment) {
        const fromByDayStr = this.rangeDateTranslate(begin.date() === 2 ? 'fromStartWith2' : 'from');
        const toStr = this.rangeDateTranslate('to');

        const beginStr = this.formatDate(begin, true, !begin.isSame(end, 'month'), !begin.isSame(end, 'year'));
        const endStr = this.formatDate(end, true, true, !this.isCurrentYear(begin, end));

        if (begin.isSame(end, 'day')) {
            return endStr;
        }

        return `${fromByDayStr} ${beginStr} ${toStr} ${endStr}`;
    }

    private isCurrentYear(begin: Moment, end: Moment) {
        return moment().isSame(begin, 'year') && moment().isSame(end, 'year');
    }

    private capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private rangeDateTranslate(key: string) {
        return this.transloco.translate(`rangeDate.${key}`, null, 'range-datepicker|scoped');
    }

    private formatDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'MMMM', y && 'y'].filter(v => v).join(' '), this.locale);
    }

    private formatStandaloneDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'LLLL', y && 'y'].filter(v => v).join(' '), this.locale);
    }
}
