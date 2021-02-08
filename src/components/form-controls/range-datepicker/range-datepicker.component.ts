import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import moment, { Moment } from 'moment';
import { Observable, zip } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { SetIntersection } from 'utility-types';

import { CustomFormControl } from '../utils';

type MomentPeriod = SetIntersection<moment.unitOfTime.StartOf, 'day' | 'week' | 'month' | 'year'>;
export type Period = MomentPeriod | '3month';

type MatDateRange<T> = Omit<DateRange<T>, '_disableStructuralEquivalency' | 'start'> & { begin: T };
type InternalRange = MatDateRange<Date>;
export type Range = MatDateRange<Moment> & { period?: Period };

// TODO: remove all range datepicker usages
/**
 * @deprecated
 */
@UntilDestroy()
@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }],
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, Range> implements OnInit {
    minDate = moment().subtract(15, 'year').startOf('year').toDate();
    @Input()
    set min(min: Moment) {
        this.minDate = min.toDate();
    }
    get min() {
        return moment(this.minDate);
    }

    maxDate = moment().endOf('day').toDate();
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

    dateControl = new FormGroup<InternalRange>({
        begin: new FormControl(),
        end: new FormControl(),
    });

    current = moment().toDate();
    period: Period = null;

    private dateChanges$: Observable<InternalRange> = zip(
        this.dateControl.controls.begin.valueChanges,
        this.dateControl.controls.end.valueChanges
    ).pipe(
        map(([begin, end]: [Date, Date]) => {
            return { begin, end };
        }),
        filter(({ begin, end }: InternalRange) => {
            return !isNil(begin) && !isNil(end);
        })
    );

    ngOnInit() {
        this.dateChanges$.pipe(untilDestroyed(this)).subscribe((range: InternalRange) => {
            this.formControl.setValue(range);
        });

        this.formControl.valueChanges.pipe(startWith<null, InternalRange>(null), untilDestroyed(this)).subscribe(() => {
            this.initPeriod();
        });
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
        return { begin: begin.toDate(), end: end.toDate() } as InternalRange;
    }

    pickerOpened(): void {
        this.dateControl.setValue(this.value, { emitEvent: false });
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
                this.changeRange(newBegin, newBegin.clone().add(2, 'month').endOf('month'));
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
                this.changeRange(newBegin, newBegin.clone().add(2, 'month').endOf('month'));
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
                this.changeRange(moment().subtract(2, 'month').startOf('month'), moment().endOf('month'));
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

    private initPeriod(): void {
        if (!this.period) {
            this.period = this.takeUnitOfTime();
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
