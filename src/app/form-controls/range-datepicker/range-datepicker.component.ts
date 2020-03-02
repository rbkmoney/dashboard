import { Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import moment, { Moment, unitOfTime } from 'moment';
import { SatDatepickerRangeValue } from 'saturn-datepicker';
import { SetIntersection } from 'utility-types';
import { map } from 'rxjs/operators';

import { CustomFormControl } from '../utils';

type InternalRange = SatDatepickerRangeValue<Date>;
export type Range = SatDatepickerRangeValue<Moment>;

type MomentPeriod = SetIntersection<unitOfTime.StartOf, 'week' | 'month' | 'year'>;
type Period = MomentPeriod | '3month';

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, Range> {
    @Input()
    min: Date = null;

    @Input()
    max: Date = moment()
        .endOf('day')
        .toDate();

    period: Period = null;

    formControlSubscription = this.formControl.valueChanges.pipe(map(this.toPublicValue.bind(this))).subscribe(() => {
        this.period = this.takeUnitOfTime();
    });

    get current() {
        return moment();
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
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('year') };
                return;
            }
            case '3month': {
                const newBegin = begin.clone().subtract(3, 'month');
                this.publicValue = {
                    begin: newBegin,
                    end: newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                };
                return;
            }
            case 'month': {
                const newBegin = begin.clone().subtract(1, 'month');
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('month') };
                return;
            }
            case 'week': {
                const newBegin = begin.clone().subtract(1, 'week');
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('week') };
                return;
            }
            default:
                const diff = end.diff(begin);
                this.publicValue = {
                    begin: begin.subtract(diff).subtract(1, 'day'),
                    end: end.subtract(diff).subtract(1, 'day')
                };
        }
    }

    forward() {
        const { begin, end } = this.publicValue;
        switch (this.period) {
            case 'year': {
                const newBegin = begin.clone().add(1, 'year');
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('year') };
                return;
            }
            case '3month': {
                const newBegin = begin.clone().add(3, 'month');
                this.publicValue = {
                    begin: newBegin,
                    end: newBegin
                        .clone()
                        .add(2, 'month')
                        .endOf('month')
                };
                return;
            }
            case 'month': {
                const newBegin = begin.clone().add(1, 'month');
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('month') };
                return;
            }
            case 'week': {
                const newBegin = begin.clone().add(1, 'week');
                this.publicValue = { begin: newBegin, end: newBegin.clone().endOf('week') };
                return;
            }
            default:
                const diff = end.diff(begin, 'day');
                this.publicValue = {
                    begin: begin.clone().add(diff + 1, 'day'),
                    end: end.clone().add(diff + 1, 'day')
                };
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
            this.publicValue = { begin, end };
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
}
