import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import moment, { Moment } from 'moment';
import { SatDatepickerRangeValue } from 'saturn-datepicker';
import { SetIntersection } from 'utility-types';
import { map } from 'rxjs/operators';

import { CustomFormControl } from '../utils';

type InternalRange = SatDatepickerRangeValue<Date>;
export type Range = SatDatepickerRangeValue<Moment>;

type MomentPeriod = SetIntersection<moment.unitOfTime.StartOf, 'week' | 'month' | 'year'>;
type Period = MomentPeriod | '3month';

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, Range> implements OnChanges {
    @Input() min: Moment;
    @Input() max: Moment;

    @ViewChild('input', { static: false })
    set input(input: ElementRef<HTMLInputElement>) {
        if (input && input.nativeElement) {
            this.setInputElement(input.nativeElement);
        }
    }

    current = moment();
    minDate: Date = moment()
        .subtract(15, 'year')
        .startOf('year')
        .toDate();
    maxDate: Date = moment()
        .endOf('day')
        .toDate();
    period: Period = null;
    formControlSubscription = this.formControl.valueChanges.pipe(map(this.toPublicValue.bind(this))).subscribe(() => {
        if (!this.period) {
            this.period = this.takeUnitOfTime();
        }
    });

    get isMaxDate() {
        return moment(this.maxDate).isSame(this.publicValue.end, 'day');
    }

    get isMinDate() {
        return moment(this.minDate).isSame(this.publicValue.begin, 'day');
    }

    ngOnChanges({ min, max }: SimpleChanges) {
        this.minDate = min ? min.currentValue.toDate() : null;
        this.maxDate = max ? max.currentValue.toDate() : null;
        super.ngOnChanges();
    }

    toPublicValue({ begin, end }: InternalRange): Range {
        return { begin: moment(begin), end: moment(end) };
    }

    toInternalValue({ begin, end }: Range): InternalRange {
        return { begin: begin.toDate(), end: end.toDate() };
    }

    back() {
        const { begin, end } = this.publicValue;
        switch (this.period) {
            case 'year': {
                const newBegin = begin.clone().subtract(1, 'year');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('year') });
                return;
            }
            case '3month': {
                const newBegin = begin.clone().subtract(3, 'month');
                this.changeDate({
                    begin: newBegin,
                    end: newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                });
                return;
            }
            case 'month': {
                const newBegin = begin.clone().subtract(1, 'month');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('month') });
                return;
            }
            case 'week': {
                const newBegin = begin.clone().subtract(1, 'week');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('week') });
                return;
            }
            default:
                const diff = end.diff(begin);
                this.changeDate({
                    begin: begin.subtract(diff).subtract(1, 'day'),
                    end: end.subtract(diff).subtract(1, 'day')
                });
        }
    }

    forward() {
        const { begin, end } = this.publicValue;
        switch (this.period) {
            case 'year': {
                const newBegin = begin.clone().add(1, 'year');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('year') });
                return;
            }
            case '3month': {
                const newBegin = begin.clone().add(3, 'month');
                this.changeDate({
                    begin: newBegin,
                    end: newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                });
                return;
            }
            case 'month': {
                const newBegin = begin.clone().add(1, 'month');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('month') });
                return;
            }
            case 'week': {
                const newBegin = begin.clone().add(1, 'week');
                this.changeDate({ begin: newBegin, end: newBegin.clone().endOf('week') });
                return;
            }
            default:
                const diff = end.diff(begin, 'day');
                this.changeDate({
                    begin: begin.clone().add(diff + 1, 'day'),
                    end: end.clone().add(diff + 1, 'day')
                });
        }
    }

    selectPeriod(period: Period) {
        if (period) {
            const end = moment().endOf('day');
            let begin = end;
            switch (period) {
                case 'year':
                    begin = moment().startOf('year');
                    break;
                case '3month':
                    begin = moment()
                        .subtract(2, 'month')
                        .startOf('month');
                    break;
                case 'month':
                    begin = moment().startOf('month');
                    break;
                case 'week':
                    begin = moment().startOf('week');
                    break;
            }
            this.changeDate({ begin, end });
        }
        this.period = period;
    }

    private checkIsUnitOfTime(unitOfTime: MomentPeriod, countOfUnits = 1): boolean {
        const { begin, end } = this.publicValue;
        const beginOfUnit = begin.clone().startOf(unitOfTime);
        const expectedEndOfPeriodByBegin = beginOfUnit
            .clone()
            .add(countOfUnits - 1, unitOfTime)
            .endOf(unitOfTime);
        return begin.isSame(beginOfUnit, 'day') && end.isSame(expectedEndOfPeriodByBegin, 'day');
    }

    private takeUnitOfTime(): Period {
        if (this.checkIsUnitOfTime('year')) {
            return 'year';
        }
        if (this.checkIsUnitOfTime('month', 3)) {
            return '3month';
        }
        if (this.checkIsUnitOfTime('month')) {
            return 'month';
        }
        if (this.checkIsUnitOfTime('week')) {
            return 'week';
        }
        return null;
    }

    private changeDate({ begin, end }: { begin: Moment; end: Moment }) {
        const min = moment(this.minDate);
        const max = moment(this.maxDate);
        if (begin.isBefore(min)) {
            begin = min;
        }
        if (begin.isAfter(max)) {
            begin = max.clone().startOf('day');
        }
        if (end.isAfter(max)) {
            end = max;
        }
        if (end.isBefore(min)) {
            end = min.clone().endOf('day');
        }
        this.publicValue = { begin, end };
    }
}
