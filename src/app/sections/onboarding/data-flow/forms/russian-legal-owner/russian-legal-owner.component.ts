import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RussianLegalOwnerService } from './russian-legal-owner.service';

@Component({
    selector: 'dsh-russian-legal-owner',
    templateUrl: 'russian-legal-owner.component.html',
    styleUrls: ['russian-legal-owner.component.scss']
})
export class RussianLegalOwnerComponent implements OnInit, OnDestroy {
    layoutGap = '20px';

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
