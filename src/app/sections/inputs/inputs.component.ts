import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { currencyMask } from '../../form-controls';

@Component({
    templateUrl: 'inputs.component.html',
    styleUrls: ['inputs.component.scss'],
    providers: []
})
export class InputsComponent {
    formGroup: FormGroup;

    get currencyMask() {
        return currencyMask;
    }

    constructor(fb: FormBuilder) {
        this.formGroup = fb.group({
            bin: '',
            card: '',
            sum: ''
        });
    }
}
