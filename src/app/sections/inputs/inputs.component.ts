import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'inputs.component.html',
    styleUrls: ['inputs.component.scss'],
    providers: []
})
export class InputsComponent {
    formGroup: FormGroup;

    constructor(fb: FormBuilder) {
        this.formGroup = fb.group({
            bin: '',
            card: '',
            sum: ''
        });
    }
}
