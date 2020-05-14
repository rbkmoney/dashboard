import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import moment, { Moment } from 'moment';
import { map } from 'rxjs/operators';
import { SatDatepickerRangeValue } from 'saturn-datepicker';
import { SetIntersection } from 'utility-types';

import { CustomFormControl } from '../utils';

type MomentPeriod = SetIntersection<moment.unitOfTime.StartOf, 'day' | 'week' | 'month' | 'year'>;
export type Period = MomentPeriod | '3month';

type InternalRange = SatDatepickerRangeValue<Date>;
export type Range = SatDatepickerRangeValue<Moment> & { period?: Period };

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, Range> implements OnInit, OnDestroy {
    minDate = moment()
        .subtract(15, 'year')
        .startOf('year')
        .toDate();
    @Input()
    set min(min: Moment) {
        this.minDate = min.toDate();
    }
    get min() {
        return moment(this.minDate);
    }

    maxDate = moment()
        .endOf('day')
        .toDate();
    @Input()
    set max(max: Moment) {
        this.maxDate = max.toDate();
    }
    get max() {
        return moment(this.maxDate);
    }

    protected _disablePeriodSelect = false;
    @Input()
    get disablePeriodSelect(): boolean {
        return this._disablePeriodSelect;
    }
    set disablePeriodSelect(value: boolean) {
        this._disablePeriodSelect = coerceBooleanProperty(value);
    }

    @ViewChild('input')
    set input(input: ElementRef<HTMLInputElement>) {
        if (input && input.nativeElement) {
            this.setInputElement(input.nativeElement);
        }
    }

    current = moment();
    period: Period = null;
    formControlSubscription = this.formControl.valueChanges.pipe(map(this.toPublicValue.bind(this))).subscribe(() => {
        if (!this.period) {
            this.period = this.takeUnitOfTime();
        }
    });

    ngOnInit() {
        if (!this.period) {
            this.period = this.takeUnitOfTime();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.formControlSubscription.unsubscribe();
    }

    get isMaxDate() {
        return this.publicValue.end.isSameOrAfter(this.max, 'day');
    }

    get isMinDate() {
        return this.publicValue.begin.isSameOrBefore(this.min, 'day');
    }

    toPublicValue({ begin, end }: InternalRange): Range {
        return { begin: moment(begin).startOf('day'), end: moment(end).endOf('day'), period: this.period };
    }

    toInternalValue({ begin, end }: Range): InternalRange {
        return { begin: begin.toDate(), end: end.toDate() };
    }

    back() {
        const { begin, end } = this.publicValue;
        switch (this.period) {
            case 'year': {
                const newBegin = begin.clone().subtract(1, 'year');
                this.changeRange(newBegin, newBegin.clone().endOf('year'));
                return;
            }
            case '3month': {
                const newBegin = begin.clone().subtract(3, 'month');
                this.changeRange(
                    newBegin,
                    newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                );
                return;
            }
            case 'month': {
                const newBegin = begin.clone().subtract(1, 'month');
                this.changeRange(newBegin, newBegin.clone().endOf('month'));
                return;
            }
            case 'week': {
                const newBegin = begin.clone().subtract(1, 'week');
                this.changeRange(newBegin, newBegin.clone().endOf('week'));
                return;
            }
            case 'day': {
                const newBegin = begin.clone().subtract(1, 'day');
                this.changeRange(newBegin, newBegin.clone().endOf('day'));
                return;
            }
            default:
                const diff = end.diff(begin);
                this.changeRange(begin.subtract(diff).subtract(1, 'day'), end.subtract(diff).subtract(1, 'day'));
        }
    }

    forward() {
        const { begin, end } = this.publicValue;
        switch (this.period) {
            case 'year': {
                const newBegin = begin.clone().add(1, 'year');
                this.changeRange(newBegin, newBegin.clone().endOf('year'));
                return;
            }
            case '3month': {
                const newBegin = begin.clone().add(3, 'month');
                this.changeRange(
                    newBegin,
                    newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                );
                return;
            }
            case 'month': {
                const newBegin = begin.clone().add(1, 'month');
                this.changeRange(newBegin, newBegin.clone().endOf('month'));
                return;
            }
            case 'week': {
                const newBegin = begin.clone().add(1, 'week');
                this.changeRange(newBegin, newBegin.clone().endOf('week'));
                return;
            }
            case 'day': {
                const newBegin = begin.clone().add(1, 'day');
                this.changeRange(newBegin, newBegin.clone().endOf('day'));
                return;
            }
            default:
                const diff = end.diff(begin, 'day');
                this.changeRange(begin.clone().add(diff + 1, 'day'), end.clone().add(diff + 1, 'day'));
        }
    }

    selectPeriod(period: Period = null) {
        this.period = period;
        switch (period) {
            case 'year':
                this.changeRange(moment().startOf('year'), moment().endOf('year'));
                break;
            case '3month':
                this.changeRange(
                    moment()
                        .subtract(2, 'month')
                        .startOf('month'),
                    moment().endOf('month')
                );
                break;
            case 'month':
                this.changeRange(moment().startOf('month'), moment().endOf('month'));
                break;
            case 'week':
                this.changeRange(moment().startOf('week'), moment().endOf('week'));
                break;
            case 'day':
                this.changeRange(moment().startOf('day'), moment().endOf('day'));
                break;
        }
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
        if (this.checkIsUnitOfTime('day')) {
            return 'day';
        }
        return null;
    }

    private changeRange(begin: Moment, end: Moment) {
        this.publicValue = { begin, end, period: this.period };
    }
}
