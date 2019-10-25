import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BasicInfoService } from './basic-info.service';

@Component({
    selector: 'dsh-basic-info',
    templateUrl: 'basic-info.component.html'
})
export class BasicInfoComponent implements OnInit, OnDestroy {
    layoutGap = '20px';
    basePath = 'sections.onboarding.dataFlow.basicInfo';

    form: FormGroup = this.basicInfoService.form;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private basicInfoService: BasicInfoService) {}

    ngOnInit() {
        this.valuePersistentSub = this.basicInfoService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
