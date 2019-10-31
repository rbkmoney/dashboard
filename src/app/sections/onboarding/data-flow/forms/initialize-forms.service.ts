import { Injectable, OnDestroy } from '@angular/core';

import { BasicInfoService } from './basic-info';
import { QuestionaryFormService } from './questionary-form.service';
import { RussianLegalOwnerService } from './russian-legal-owner';

@Injectable()
export class InitializeFormsService implements OnDestroy {
    private initializeContainer: QuestionaryFormService[];

    constructor(
        private basicInfoService: BasicInfoService,
        private russianLegalOwnerService: RussianLegalOwnerService
    ) {
        this.initializeContainer = [this.basicInfoService, this.russianLegalOwnerService];
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
