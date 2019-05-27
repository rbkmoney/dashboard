import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'inputs.component.html',
    styleUrls: ['inputs.component.scss'],
    providers: []
})
export class InputsComponent {
    constructor(fb: FormBuilder) {}
}
