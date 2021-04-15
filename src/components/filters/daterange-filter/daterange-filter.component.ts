import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ComponentChanges } from '@rbkmoney/utils';
import { Moment } from 'moment';
import { merge, Subject } from 'rxjs';
import { map, pluck, scan, shareReplay, withLatestFrom } from 'rxjs/operators';

import { Daterange, isDaterange } from '@dsh/pipes/daterange';

@Component({
    selector: 'dsh-daterange-filter',
    templateUrl: 'daterange-filter.component.html',
    styleUrls: ['daterange-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaterangeFilterComponent implements OnChanges {
    @Input() selected?: Partial<Daterange>;
    @Output() selectedChange = new EventEmitter<Daterange>();

    @ViewChild('beginCalendar') beginCalendar: MatCalendar<Moment>;
    @ViewChild('endCalendar') endCalendar: MatCalendar<Moment>;

    save$ = new Subject();
    select$ = new Subject<Partial<Daterange>>();
    inputSelect$ = new Subject<Partial<Daterange>>();

    selected$ = merge(this.select$, this.inputSelect$).pipe(
        scan((acc, s) => {
            const begin = s.begin !== undefined ? s.begin : acc.begin;
            const end = s.end !== undefined ? s.end : acc.end;
            if (begin && end && begin.isAfter(end)) {
                return s.begin ? { begin } : { end };
            }
            return { begin, end };
        }, {} as Partial<Daterange>),
        shareReplay(1)
    );

    savedSelected$ = merge(this.inputSelect$, this.save$).pipe(
        withLatestFrom(this.selected$),
        pluck(1),
        map((s) => (isDaterange(s) ? s : null)),
        shareReplay(1)
    );

    constructor() {
        this.save$
            .pipe(
                withLatestFrom(this.selected$),
                pluck(1),
                map((s) => (isDaterange(s) ? s : null))
            )
            .subscribe((s) => {
                this.selectedChange.next({
                    begin: s.begin && s.begin.startOf('day'),
                    end: s.end && s.end.endOf('day'),
                });
                if (!s) {
                    this.clear();
                }
            });
        this.select$.subscribe(({ begin, end }) => {
            if (begin) {
                this.beginCalendar.activeDate = begin;
            }
            if (end) {
                this.endCalendar.activeDate = end;
            }
        });
        this.savedSelected$.subscribe();
    }

    ngOnChanges({ selected }: ComponentChanges<DaterangeFilterComponent>): void {
        if (selected) {
            this.inputSelect$.next(selected.currentValue);
        }
    }

    beginDateChange(begin: Moment) {
        this.select$.next({ begin });
    }

    endDateChange(end: Moment) {
        this.select$.next({ end });
    }

    clear() {
        this.select$.next({ begin: null, end: null });
    }

    save() {
        this.save$.next();
    }
}
