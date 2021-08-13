import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import isNil from 'lodash-es/isNil';

import { BankContent } from '@dsh/api-codegen/aggr-proxy';

import { BankAccountFormData } from '../../types/bank-account-form-data';
import { RussianShopEntity } from '../../types/russian-shop-entity';

@Component({
    selector: 'dsh-new-bank-account',
    templateUrl: './new-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBankAccountComponent {
    @Input() form: FormGroup<RussianShopEntity>;

    get bankAccountForm(): FormGroup<BankAccountFormData> {
        this.chekFormProvided();
        if (isNil(this.form.get('newBankAccount'))) {
            throw new Error(`Form doesn't contains newBankAccount control`);
        }
        return this.form.get('newBankAccount') as FormGroup<BankAccountFormData>;
    }

    get bankAccountNameControl(): FormControl<BankAccountFormData['bankName']> {
        this.chekFormProvided();
        if (isNil(this.form.get(`newBankAccount.bankName`))) {
            throw new Error(`Form doesn't contains "newBankAccount.bankName" control`);
        }

        return this.form.get(`newBankAccount.bankName`) as FormControl<BankAccountFormData['bankName']>;
    }

    bankSelected(bank: BankContent): void {
        if (bank)
            this.form.patchValue(
                {
                    newBankAccount: {
                        bankName: bank.value,
                        bankBik: bank.bic,
                        bankPostAccount: bank.correspondentAccount,
                    },
                },
                {
                    emitEvent: true,
                }
            );
    }

    protected chekFormProvided(): void {
        if (isNil(this.form)) {
            throw new Error(`Form wasn't provided`);
        }
    }
}
