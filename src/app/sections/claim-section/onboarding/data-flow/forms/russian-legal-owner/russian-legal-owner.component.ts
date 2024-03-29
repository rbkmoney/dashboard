import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RussianLegalOwnerService } from './russian-legal-owner.service';

@Component({
    templateUrl: 'russian-legal-owner.component.html',
})
export class RussianLegalOwnerComponent implements OnInit, OnDestroy {
    form$ = this.russianLegalOwnerService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private russianLegalOwnerService: RussianLegalOwnerService) {}

    ngOnInit() {
        this.valuePersistentSub = this.russianLegalOwnerService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
