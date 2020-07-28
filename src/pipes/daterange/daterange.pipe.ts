import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import moment, { Moment } from 'moment';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map, scan, shareReplay, switchMap } from 'rxjs/operators';

interface Daterange {
    begin?: Moment;
    end?: Moment;
}

@Pipe({ name: 'daterange' })
export class DaterangePipe implements PipeTransform {
    private daterange$ = new BehaviorSubject<Daterange>({});
    private result = '';
    private translations$ = this.loadTranslations();

    constructor(@Inject(LOCALE_ID) private locale: string, private transloco: TranslocoService) {
        this.daterange$
            .pipe(switchMap((daterange) => this.switchToDaterangeStr(daterange)))
            .subscribe((r) => (this.result = r));
    }

    transform(daterange: Daterange): string {
        this.daterange$.next(daterange);
        return this.result;
    }

    private switchToDaterangeStr({ begin, end }: Daterange): Observable<string> {
        if (!begin || !end) {
            return of('');
        }
        if (begin.isSame(begin.clone().startOf('year'), 'day') && end.isSame(end.clone().endOf('year'), 'day')) {
            return this.toYearStr(begin, end);
        }
        if (begin.isSame(begin.clone().startOf('month'), 'day') && end.isSame(end.clone().endOf('month'), 'day')) {
            return this.toMonthStr(begin, end);
        }
        if (begin.isSame(moment().startOf('week'), 'day') && end.isSame(moment().endOf('week'), 'day')) {
            return this.translations$.pipe(map((t) => t.currentWeek));
        }
        if (begin.isSame(moment().startOf('day'), 'day') && end.isSame(moment().endOf('day'), 'day')) {
            return this.translations$.pipe(map((t) => t.today));
        }
        return this.toDateStr(begin, end);
    }

    /**
     * 2020 год
     * С 2019 по 2020 год
     */
    private toYearStr(begin: Moment, end: Moment) {
        return this.translations$.pipe(
            map((t) => {
                const endStr = `${end.year()} ${t.year}`;
                if (begin.isSame(end, 'year')) {
                    return endStr;
                }
                return `${t.from} ${begin.year()} ${t.to} ${endStr}`;
            })
        );
    }

    /**
     * Январь
     * Январь 2020
     *
     * С января по март
     * С января 2019 по март 2019 / С декабря 2019 по март 2020
     */
    private toMonthStr(begin: Moment, end: Moment) {
        return this.translations$.pipe(
            map((t) => {
                const currentYear = this.isCurrentYear(begin, end);
                const beginStr = this.formatDate(begin, false, true, !currentYear);
                const endStr = this.formatStandaloneDate(end, false, true, !currentYear);
                if (begin.isSame(end, 'month')) {
                    return this.capitalizeFirstLetter(endStr);
                }
                return `${t.from} ${beginStr} ${t.to} ${endStr}`;
            })
        );
    }

    /**
     * 2 января
     * 2 января 2020
     *
     * Со 2 по 8 марта / Со 2 января по 8 марта
     * Со 2 по 8 марта 2019 / Со 2 января 2019 по 8 марта 2020
     */
    private toDateStr(begin: Moment, end: Moment) {
        return this.translations$.pipe(
            map((t) => {
                const beginStr = this.formatDate(begin, true, !begin.isSame(end, 'month'), !begin.isSame(end, 'year'));
                const endStr = this.formatDate(end, true, true, !this.isCurrentYear(begin, end));
                if (begin.isSame(end, 'day')) {
                    return endStr;
                }
                return `${begin.date() === 2 ? t.fromStartWith2 : t.from} ${beginStr} ${t.to} ${endStr}`;
            })
        );
    }

    private isCurrentYear(begin: Moment, end: Moment) {
        return moment().isSame(begin, 'year') && moment().isSame(end, 'year');
    }

    private capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private formatDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'MMMM', y && 'y'].filter((v) => v).join(' '), this.locale);
    }

    private formatStandaloneDate(date: Moment, d: boolean = false, m: boolean = false, y: boolean = false) {
        return formatDate(date.toDate(), [d && 'd', m && 'LLLL', y && 'y'].filter((v) => v).join(' '), this.locale);
    }

    private translate(key: string) {
        return this.transloco.selectTranslate(key, null, 'daterange|scoped');
    }

    private loadTranslations() {
        const words = ['from', 'fromStartWith2', 'to', 'today', 'currentWeek', 'year'] as const;
        return of(words).pipe(
            switchMap((w) => merge(...w.map((word) => this.translate(word).pipe(map((t: string) => ({ [word]: t })))))),
            scan((acc, t) => ({ ...acc, ...t }), {} as { [N in typeof words[number]]: string }),
            shareReplay(1)
        );
    }
}
