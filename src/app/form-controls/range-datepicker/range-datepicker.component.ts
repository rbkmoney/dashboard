import { Component } from '@angular/core';
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
    toPublicValue({ begin, end }: InternalRange): Range {
        return { begin: moment(begin), end: moment(end) };
    }

    toInternalValue({ begin, end }: Range): InternalRange {
        return { begin: begin.toDate(), end: end.toDate() };
    }
}
