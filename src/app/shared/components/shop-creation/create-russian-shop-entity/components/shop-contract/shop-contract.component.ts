import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Shop, Contract } from '@dsh/api-codegen/capi';
import { ShopContractDetailsService } from '@dsh/app/shared/services/shop-contract-details';
import {
    RequiredSuper,
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
} from '@dsh/utils';

enum Type {
    New,
    Existing,
}

export interface OrgDetailsForm {
    type: Type;
    contract: Contract;
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

    contract$ = this.contractService.shopContract$;
    isLoading$ = this.contractService.isLoading$;
    hasError$ = this.contractService.errorOccurred$;
    shopControl = new FormControl<Shop>(null);

    constructor(injector: Injector, private contractService: ShopContractDetailsService, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.shopControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe((shop) => this.contractService.requestContract(shop?.contractID));
        this.contract$
            .pipe(untilDestroyed(this))
            .subscribe((contract) => this.formControl.controls.contract.setValue(contract));
        return super.ngOnInit();
    }
}
