import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RussianPrivateEntityService } from './russian-private-entity.service';

@Component({
    templateUrl: 'russian-private-entity.component.html',
    styleUrls: ['russian-private-entity.component.scss'],
})
export class RussianPrivateEntityComponent implements OnInit, OnDestroy {
    form$ = this.russianPrivateEntityService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private russianPrivateEntityService: RussianPrivateEntityService) {}

    ngOnInit() {
        this.valuePersistentSub = this.russianPrivateEntityService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
