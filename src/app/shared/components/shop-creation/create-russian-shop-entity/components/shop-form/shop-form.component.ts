import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { startWith } from 'rxjs/operators';

import { PayoutTool } from '@dsh/api-codegen/capi';

import { BankAccountType } from '../../types/bank-account-type';
import { RussianShopEntity } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFormComponent implements OnInit {
    @Input() form: FormGroup<RussianShopEntity>;
    @Input() payoutTool: PayoutTool;
    @Input() isLoading: boolean;
    @Input() hasError: boolean;

    bankAccountType = BankAccountType;

    get contractControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get('contract'))) {
            throw new Error(`Form doesn't contains contract control`);
        }

        return this.form.get('contract') as FormControl;
    }

    get isNewBankAccount(): boolean {
        return this.bankAccountTypeValue === BankAccountType.New;
    }

    get isExistingBankAccount(): boolean {
        return this.bankAccountTypeValue === BankAccountType.Existing;
    }

    private get bankAccountTypeValue(): BankAccountType {
        this.chekFormProvided();
        if (isNil(this.form.get('bankAccountType'))) {
            throw new Error(`Form doesn't contains bankAccountType control`);
        }

        return this.form.get('bankAccountType').value as BankAccountType;
    }

    ngOnInit(): void {
        this.initBankAccount();
    }

    protected chekFormProvided(): void {
        if (isNil(this.form)) {
            throw new Error(`Form wasn't provided`);
        }
    }

    private initBankAccount(): void {
        const { newBankAccount, bankAccountType } = this.form.controls;
        const bankShopControl = this.form.controls.bankShop;
        bankAccountType.valueChanges
            .pipe(startWith(bankAccountType.value), untilDestroyed(this))
            .subscribe((type: BankAccountType) => {
                switch (type) {
                    case BankAccountType.New:
                        newBankAccount.enable();
                        bankShopControl.disable();
                        break;
                    case BankAccountType.Existing:
                        newBankAccount.disable();
                        bankShopControl.enable();
                        break;
                    default:
                        newBankAccount.disable();
                        bankShopControl.disable();
                        break;
                }
            });
    }
}
