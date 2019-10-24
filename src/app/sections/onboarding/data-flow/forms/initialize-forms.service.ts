import { Injectable, OnDestroy } from '@angular/core';

import { BasicInfoService } from './basic-info';
import { QuestionaryFormService } from './questionary-form.service';

@Injectable()
export class InitializeFormsService implements OnDestroy {
    private initializeContainer: QuestionaryFormService[];

    constructor(private basicInfoService: BasicInfoService) {
        this.initializeContainer = [this.basicInfoService];
    }

    initializeForms() {
        for (const service of this.initializeContainer) {
            service.initFormValue();
            service.startFormValidityReporting();
        }
    }

    ngOnDestroy() {
        console.log('InitializeFormsService ngOnDestroy');
    }
}
