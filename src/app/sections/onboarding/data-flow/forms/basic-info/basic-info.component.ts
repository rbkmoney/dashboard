import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PartyContent } from '@dsh/api-codegen/aggr-proxy';

import { BasicInfoService } from './basic-info.service';

@Component({
    templateUrl: 'basic-info.component.html',
})
export class BasicInfoComponent implements OnInit, OnDestroy {
    layoutGap = '20px';

    form$ = this.basicInfoService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private basicInfoService: BasicInfoService) {}

    ngOnInit() {
        this.valuePersistentSub = this.basicInfoService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }

    partySelected(suggestion: PartyContent) {
        this.basicInfoService.patchForm({ inn: suggestion.inn, registrationPlace: suggestion.address.value });
    }
}
