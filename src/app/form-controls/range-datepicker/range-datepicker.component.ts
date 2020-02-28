import { Component } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import moment, { Moment } from 'moment';
import { SatDatepickerRangeValue } from 'saturn-datepicker';

import { CustomFormControl } from '../utils';

type InternalRange = SatDatepickerRangeValue<Date>;
type PublicRange = SatDatepickerRangeValue<Moment>;

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InternalRange, PublicRange> {
    toPublicValue(value: InternalRange): PublicRange {
        return { begin: moment(value.begin), end: moment(value.begin) };
    }

    toInternalValue(value: PublicRange): InternalRange {
        return { begin: value.begin.toDate(), end: value.begin.toDate() };
    }
}
