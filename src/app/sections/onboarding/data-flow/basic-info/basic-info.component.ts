import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'dsh-basic-info',
    templateUrl: 'basic-info.component.html',
    styleUrls: ['basic-info.component.scss']
})
export class BasicInfoComponent {
    layoutGap = '20px';
    basePath = 'sections.onboarding.dataFlow.basicInfo';

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        inn: ['', Validators.required],
        registrationPlace: ['', Validators.required],
        shopUrl: ['', Validators.required],
        shopName: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required]
    });

    constructor(private fb: FormBuilder) {}
}
