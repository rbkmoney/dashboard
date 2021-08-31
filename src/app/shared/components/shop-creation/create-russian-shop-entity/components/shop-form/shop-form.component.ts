import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
    createValidatedAbstractControlProviders,
    getFormValueChanges,
    RequiredSuper,
    switchControl,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

import { BankAccountType } from '../../types/bank-account-type';
import { RussianShopForm } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<RussianShopForm> implements OnInit {
    formControl = this.fb.group<RussianShopForm>({
        bankAccountType: null,
        shopDetails: null,
        orgDetails: null,
        bankAccount: null,
        payoutTool: null,
        paymentInstitution: null,
    });
    bankAccountType = BankAccountType;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        const { bankAccount, payoutTool } = this.formControl.controls;
        getFormValueChanges(this.formControl.controls.bankAccountType)
            .pipe(untilDestroyed(this))
            .subscribe((type) =>
                switchControl(type, [
                    [BankAccountType.New, bankAccount],
                    [BankAccountType.Existing, payoutTool],
                ])
            );
        return super.ngOnInit();
    }
}
