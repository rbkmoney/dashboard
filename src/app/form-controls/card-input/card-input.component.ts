import { Component, forwardRef, HostBinding } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { cardMask } from './card-input-mask';
import { FormControlBoilerplate } from '../form-control-boilerplate';

@Component({
    selector: 'dsh-card-input',
    templateUrl: 'card-input.component.html',
    styleUrls: ['card-input.component.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: CardInputComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CardInputComponent),
            multi: true
        }
    ]
})
export class CardInputComponent extends FormControlBoilerplate {
    static nextId = 0;

    @HostBinding('id')
    id = `dsh-card-input-${CardInputComponent.nextId++}`;

    get mask() {
        return cardMask;
    }
}
