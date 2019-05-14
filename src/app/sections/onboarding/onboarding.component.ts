import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'onboarding.component.html',
    styleUrls: [],
    providers: []
})
export class OnboardingComponent {
    form: FormGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            suggestions: ['']
        });
    }
}
