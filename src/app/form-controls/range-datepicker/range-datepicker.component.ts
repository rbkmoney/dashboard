import { Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import moment, { Moment } from 'moment';
import { SatDatepickerRangeValue } from 'saturn-datepicker';

import { CustomFormControl } from '../utils';

type InternalRange = SatDatepickerRangeValue<Date>;
export type Range = SatDatepickerRangeValue<Moment>;

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, Range> {
    @Input()
    min = null;

    @Input()
    max = moment()
        .endOf('day')
        .toDate();

    toPublicValue({ begin, end }: InternalRange): Range {
        return { begin: moment(begin), end: moment(end) };
    }

    toInternalValue({ begin, end }: Range): InternalRange {
        return { begin: begin.toDate(), end: end.toDate() };
    }

    back() {
        const diff = this.publicValue.end.diff(this.publicValue.begin);
        this.publicValue = {
            begin: this.publicValue.begin.subtract(diff).subtract(1, 'day'),
            end: this.publicValue.end.subtract(diff).subtract(1, 'day')
        };
    }

    forward() {
        const diff = this.publicValue.end.diff(this.publicValue.begin);
        this.publicValue = {
            begin: this.publicValue.begin.add(diff).add(1, 'day'),
            end: this.publicValue.end.add(diff).add(1, 'day')
        };
    }

    selectCurrentWeek() {
        this.publicValue = {
            begin: moment().startOf('week'),
            end: moment().endOf('day')
        };
    }

    selectCurrentMonth() {
        this.publicValue = {
            begin: moment().startOf('month'),
            end: moment().endOf('day')
        };
    }

    selectThreeMonths() {
        this.publicValue = {
            begin: moment()
                .subtract(2, 'months')
                .startOf('month'),
            end: moment().endOf('day')
        };
    }

    selectCurrentYear() {
        this.publicValue = {
            begin: moment().startOf('year'),
            end: moment().endOf('day')
        };
    }
}
