import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import isNil from 'lodash.isnil';

import { BankContent } from '../../../../../../../../api-codegen/aggr-proxy';
import { NEW_BANK_ACCOUNT_BANK_NAME_FIELD, NEW_BANK_ACCOUNT_FIELD } from '../../consts';

@Component({
    selector: 'dsh-new-bank-account',
    templateUrl: './new-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBankAccountComponent {
    @Input() form: FormGroup;

    get bankAccountForm(): FormGroup {
        this.chekFormProvided();
        if (isNil(this.form.get(NEW_BANK_ACCOUNT_FIELD))) {
            throw new Error(`Form doesn't contains "${NEW_BANK_ACCOUNT_FIELD}" control`);
        }
        return this.form.get(NEW_BANK_ACCOUNT_FIELD) as FormGroup;
    }

    get bankAccountNameControl(): FormControl {
        this.chekFormProvided();
        if (isNil(this.form.get(`${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`))) {
            throw new Error(
                `Form doesn't contains "${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}" control`
            );
        }

        return this.form.get(`${NEW_BANK_ACCOUNT_FIELD}.${NEW_BANK_ACCOUNT_BANK_NAME_FIELD}`) as FormControl;
    }

    bankSelected({ bic: bankBik, correspondentAccount: bankPostAccount, value: bankName }: BankContent): void {
        this.form.patchValue(
            {
                newBankAccount: {
                    bankName,
                    bankBik,
                    bankPostAccount,
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
