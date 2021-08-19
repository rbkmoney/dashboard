import { Component, Input, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Contract, PayoutTool } from '@dsh/api-codegen/capi';
import {
    RequiredSuper,
    createValidatedAbstractControlProviders,
    getFormValueChanges,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

import { BankAccountFormData } from '../../types/bank-account-form-data';
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
        bankAccountType: null,
        newBankAccount: this.fb.group<BankAccountFormData>({
            search: '',
            bankName: ['', Validators.required],
            bankBik: ['', Validators.required],
            bankPostAccount: ['', Validators.required],
            account: ['', Validators.required],
        }),
        bankShop: [null, Validators.required],
        contract: [null, Validators.required],
    });

    bankAccountType = BankAccountType;

    get contractControl(): FormControl<Contract> {
        return this.formControl.controls.contract as FormControl<Contract>;
    }

    get isNewBankAccount(): boolean {
        return this.formControl.controls.bankAccountType.value === BankAccountType.New;
    }

    get isExistingBankAccount(): boolean {
        return this.formControl.controls.bankAccountType.value === BankAccountType.Existing;
    }

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
