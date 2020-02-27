import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import moment, { Moment } from 'moment';

import { CustomFormControl } from '../utils';

interface InputRange {
    begin: Date;
    end: Date;
}

interface OutputRange {
    begin: Moment;
    end: Moment;
}

@Component({
    selector: 'dsh-range-datepicker',
    templateUrl: 'range-datepicker.component.html',
    styleUrls: ['range-datepicker.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: RangeDatepickerComponent }]
})
export class RangeDatepickerComponent extends CustomFormControl<InputRange, OutputRange> {
    formControl = new FormControl({ begin: null, end: null });

    getValue({ begin, end }: InputRange): OutputRange {
        return { begin: moment(begin), end: moment(end) };
    }
}
