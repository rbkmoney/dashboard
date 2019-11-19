import { Component, forwardRef, HostBinding } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { cardMask } from './last-digits-input-mask';
import { CustomFormControl } from '../../custom-form-control';

@Component({
    selector: 'dsh-card-last-digits-input',
    templateUrl: 'last-digits-input.component.html',
    styleUrls: ['../card-controls.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: LastDigitsInputComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LastDigitsInputComponent),
            multi: true
        }
    ]
})
export class LastDigitsInputComponent extends CustomFormControl {
    static nextId = 0;

    @HostBinding('id')
    id = `dsh-card-input-${LastDigitsInputComponent.nextId++}`;

    get mask() {
        return cardMask;
    }
}
