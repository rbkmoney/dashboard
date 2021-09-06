import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
    createValidatedAbstractControlProviders,
    switchControl,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

import { Type } from '../../../new-existing-switch/new-existing-switch.component';
import { BankAccountType } from '../../types/bank-account-type';
import { RussianShopForm } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<RussianShopForm> {
    formControl = this.fb.group<RussianShopForm>({
        shopDetails: null,
        orgDetails: null,
        bankAccountType: null,
        bankAccount: { value: null, disabled: true },
        payoutTool: { value: null, disabled: true },
        paymentInstitution: null,
    });
    bankAccountType = BankAccountType;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    typeChanged(type: Type): void {
        switchControl(type, [
            [Type.New, this.formControl.controls.bankAccount],
            [Type.Existing, this.formControl.controls.payoutTool],
        ]);
    }
}
