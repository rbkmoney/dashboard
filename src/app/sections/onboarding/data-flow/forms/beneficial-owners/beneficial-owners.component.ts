import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material';

import { BeneficialOwnersService } from './beneficial-owners.service';

@Component({
    templateUrl: 'beneficial-owners.component.html',
    styleUrls: ['beneficial-owners.component.scss']
})
export class BeneficialOwnersComponent implements OnInit, OnDestroy {
    layoutGap = '20px';

    form$ = this.beneficialOwnersService.form$;

    beneficialOwners$ = this.beneficialOwnersService.form$.pipe(map(form => form.controls.beneficialOwners));

    isNoOwners$ = this.beneficialOwnersService.isNoOwners$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private beneficialOwnersService: BeneficialOwnersService) {}

    noOwnersChange({ checked }: MatCheckboxChange) {
        checked ? this.beneficialOwnersService.clearOwners() : this.beneficialOwnersService.addOwner();
        this.beneficialOwnersService.setNoOwners(checked);
    }

    addOwner() {
        this.beneficialOwnersService.addOwner();
    }

    removeOwner(index: number) {
        this.beneficialOwnersService.removeOwner(index);
    }

    ngOnInit() {
        this.valuePersistentSub = this.beneficialOwnersService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
