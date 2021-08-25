import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Shop } from '@dsh/api-codegen/capi';
import {
    createValidatedAbstractControlProviders,
    getFormValueChanges,
    RequiredSuper,
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
        shopDetails: null,
        orgDetails: null,
        bankAccount: null,
        payoutTool: null,
    });
    bankAccountTypeControl = this.fb.control<BankAccountType>(null);
    bankShopControl = this.fb.control<Shop>(null);
    bankAccountType = BankAccountType;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        const { bankAccount, payoutTool } = this.formControl.controls;
        getFormValueChanges(this.bankAccountTypeControl)
            .pipe(untilDestroyed(this))
            .subscribe((type) => {
                switch (type) {
                    case BankAccountType.New:
                        bankAccount.enable();
                        payoutTool.disable();
                        break;
                    case BankAccountType.Existing:
                        bankAccount.disable();
                        payoutTool.enable();
                        break;
                    default:
                        bankAccount.disable();
                        payoutTool.disable();
                        break;
                }
            });
        return super.ngOnInit();
    }

    validate(): ValidationErrors | null {
        return super.validate() || (this.bankAccountTypeControl.invalid ? { bankAccountTypeError: true } : null);
    }
}
