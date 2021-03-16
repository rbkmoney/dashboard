import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@ngneat/reactive-forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { getAbstractControl } from '@dsh/app/shared/utils';

import { BeneficialOwnersService } from './beneficial-owners.service';

@Component({
    templateUrl: 'beneficial-owners.component.html',
    styleUrls: ['beneficial-owners.component.scss'],
})
export class BeneficialOwnersComponent implements OnInit, OnDestroy {
    form$ = this.beneficialOwnersService.form$;

    beneficialOwners$: Observable<FormArray> = this.beneficialOwnersService.form$.pipe(
        map((form: FormGroup) => getAbstractControl<FormArray>(form, 'beneficialOwners'))
    );

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private beneficialOwnersService: BeneficialOwnersService) {}

    ngOnInit(): void {
        this.valuePersistentSub = this.beneficialOwnersService.startFormValuePersistent();
    }

    ngOnDestroy(): void {
        this.valuePersistentSub.unsubscribe();
    }

    addOwner(): void {
        this.beneficialOwnersService.addOwner();
    }

    removeOwner(index: number): void {
        this.beneficialOwnersService.removeOwner(index);
    }
}
