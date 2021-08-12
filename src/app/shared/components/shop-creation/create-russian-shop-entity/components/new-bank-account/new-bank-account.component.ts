import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import isNil from 'lodash-es/isNil';

import { BankContent } from '@dsh/api-codegen/aggr-proxy';

import {
    NEW_BANK_ACCOUNT_BANK_BIK_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD,
} from '../../consts';

@Component({
    selector: 'dsh-new-bank-account',
    templateUrl: './new-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBankAccountComponent {
    @Input() form: FormGroup;

    get bankAccountForm(): FormGroup {
        this.chekFormProvided();
        if (isNil(this.form.get('newBankAccount'))) {
            throw new Error(`Form doesn't contains newBankAccount control`);
        }
        return this.form.get('newBankAccount') as FormGroup;
    }

    get bankAccountNameControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get(`newBankAccount.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`))) {
            throw new Error(`Form doesn't contains "newBankAccount.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}" control`);
        }

        return this.form.get(`newBankAccount.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`) as FormControl;
    }

    bankSelected(bank: BankContent): void {
        if (bank)
            this.form.patchValue(
                {
                    newBankAccount: {
                        [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: bank.value,
                        [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: bank.bic,
                        [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: bank.correspondentAccount,
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
