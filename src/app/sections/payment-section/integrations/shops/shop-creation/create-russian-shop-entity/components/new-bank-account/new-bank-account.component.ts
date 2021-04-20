import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BankContent } from '@dsh/api-codegen/aggr-proxy';
import { isNil } from '@dsh/utils';

import {
    NEW_BANK_ACCOUNT_BANK_BIK_FIELD,
    NEW_BANK_ACCOUNT_BANK_NAME_FIELD,
    NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD,
    NEW_BANK_ACCOUNT_FIELD,
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
                [NEW_BANK_ACCOUNT_FIELD]: {
                    [NEW_BANK_ACCOUNT_BANK_NAME_FIELD]: bankName,
                    [NEW_BANK_ACCOUNT_BANK_BIK_FIELD]: bankBik,
                    [NEW_BANK_ACCOUNT_BANK_POST_ACCOUNT_FIELD]: bankPostAccount,
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
