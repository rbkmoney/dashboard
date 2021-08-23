import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { Shop, Contract, RussianLegalEntity } from '@dsh/api-codegen/capi';
import { ContractsService } from '@dsh/api/contracts';
import { ShopContractDetailsService } from '@dsh/app/shared/services/shop-contract-details';
import {
    RequiredSuper,
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    progressTo,
    errorTo,
} from '@dsh/utils';

enum Type {
    New,
    Existing,
}

export interface OrgDetailsForm {
    type: Type;
    contract: Overwrite<Contract, { contractor: RussianLegalEntity }>;
}

@UntilDestroy()
@Component({
    selector: 'dsh-shop-contract',
    templateUrl: 'shop-contract.component.html',
    providers: [ShopContractDetailsService, ...createValidatedAbstractControlProviders(ShopContractComponent)],
})
export class ShopContractComponent extends ValidatedWrappedAbstractControlSuperclass<OrgDetailsForm> implements OnInit {
    formControl = this.fb.group<OrgDetailsForm>({
        type: null,
        contract: null,
    });
    type = Type;
    progress$ = new BehaviorSubject(0);
    error$ = new BehaviorSubject<unknown>(null);
    shopControl = new FormControl<Shop>(null);

    constructor(injector: Injector, private contractsService: ContractsService, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.shopControl.valueChanges
            .pipe(
                switchMap((shop) =>
                    shop
                        ? this.contractsService.getContractByID(shop.contractID).pipe(
                              progressTo(this.progress$),
                              errorTo(this.error$),
                              catchError(() => EMPTY)
                          )
                        : of(null)
                ),
                untilDestroyed(this)
            )
            .subscribe((contract) => this.formControl.controls.contract.setValue(contract));
        return super.ngOnInit();
    }
}
