import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BasicInfoService } from './basic-info.service';

@Component({
    selector: 'dsh-basic-info',
    templateUrl: 'basic-info.component.html',
    providers: [BasicInfoService]
})
export class BasicInfoComponent implements OnInit {
    layoutGap = '20px';
    basePath = 'sections.onboarding.dataFlow.basicInfo';

    form: FormGroup = this.basicInfoService.form;

    constructor(private basicInfoService: BasicInfoService) {}

    ngOnInit() {
        this.basicInfoService.initFormValue();
        this.basicInfoService.startFormValuePersistent();
        this.basicInfoService.startFormValidityReporting();
    }
}
