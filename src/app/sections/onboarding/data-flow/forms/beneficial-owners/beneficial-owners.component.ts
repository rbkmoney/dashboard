import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BeneficialOwnersService } from './beneficial-owners.service';

@Component({
    templateUrl: 'beneficial-owners.component.html',
    styleUrls: ['beneficial-owners.component.scss']
})
export class BeneficialOwnersComponent implements OnInit, OnDestroy {
    layoutGap = '20px';

    form$ = this.beneficialOwnersService.form$;

    beneficialOwners$: Observable<FormArray> = this.beneficialOwnersService.form$.pipe(
        map(form => form.controls.beneficialOwners as FormArray)
    );

    isBeneficialOwnersVisible$ = this.beneficialOwnersService.isBeneficialOwnersVisible$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private beneficialOwnersService: BeneficialOwnersService) {}

    noOwnersChange({ checked }: MatCheckboxChange) {
        this.beneficialOwnersService.noOwnersChange(checked);
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
