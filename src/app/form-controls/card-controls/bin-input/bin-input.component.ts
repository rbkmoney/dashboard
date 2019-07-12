import { Component, forwardRef, HostBinding } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { binMask } from './bin-input-mask';
import { CustomFormControl } from '../../custom-form-control';

@Component({
    selector: 'dsh-card-bin-input',
    templateUrl: 'bin-input.component.html',
    styleUrls: ['../card-controls.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: BINInputComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BINInputComponent),
            multi: true
        }
    ]
})
export class BINInputComponent extends CustomFormControl {
    static nextId = 0;

    @HostBinding('id')
    id = `dsh-bin-input-${BINInputComponent.nextId++}`;

    controlType = 'dsh-bin-input';

    get mask() {
        return binMask;
    }
}
