import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './party-mgt.component.html',
    styleUrls: ['./party-mgt.component.scss']
})
export class PartyMngComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            shopName: ['', Validators.required],
            category: [''],
            creationDate: [''],
            document: ['One'],
            comment: [''],
            checked: [false],
            radio: [''],
            slided: [false],
            suggestions: ['']
        });
    }

    suggestionSelected(e) {
        console.log(e);
    }
}
