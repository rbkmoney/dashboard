import { Component, Input, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { PayoutTool } from '@dsh/api-codegen/capi';
import {
    RequiredSuper,
    createValidatedAbstractControlProviders,
    getFormValueChanges,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

import { BankAccountType } from '../../types/bank-account-type';
import { RussianShopEntity } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<RussianShopEntity> implements OnInit {
    @Input() payoutTool: PayoutTool;
    @Input() isLoading: boolean;
    @Input() hasError: boolean;

    formControl = this.fb.group<RussianShopEntity>({
        shopDetails: null,
        orgDetails: null,
        bankAccountType: null,
        newBankAccount: null,
        bankShop: [null, Validators.required],
    });

    bankAccountType = BankAccountType;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.initBankAccount();
        return super.ngOnInit();
    }

    private initBankAccount(): void {
        const { newBankAccount, bankAccountType, bankShop } = this.formControl.controls;
        getFormValueChanges(bankAccountType)
            .pipe(untilDestroyed(this))
            .subscribe((type) => {
                switch (type) {
                    case BankAccountType.New:
                        newBankAccount.enable();
                        bankShop.disable();
                        break;
                    case BankAccountType.Existing:
                        newBankAccount.disable();
                        bankShop.enable();
                        break;
                    default:
                        newBankAccount.disable();
                        bankShop.disable();
                        break;
                }
            });
    }
}
