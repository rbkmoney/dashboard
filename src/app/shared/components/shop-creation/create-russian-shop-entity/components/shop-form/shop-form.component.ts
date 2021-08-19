import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Contract, PayoutTool } from '@dsh/api-codegen/capi';

import { getFormValueChanges } from '../../../../../../../utils';
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
        return this.form.controls.contract as FormControl<Contract>;
    }

    get isNewBankAccount(): boolean {
        return this.form.controls.bankAccountType.value === BankAccountType.New;
    }

    get isExistingBankAccount(): boolean {
        return this.form.controls.bankAccountType.value === BankAccountType.Existing;
    }

    ngOnInit(): void {
        this.initBankAccount();
    }

    private initBankAccount(): void {
        const { newBankAccount, bankAccountType, bankShop } = this.form.controls;
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
