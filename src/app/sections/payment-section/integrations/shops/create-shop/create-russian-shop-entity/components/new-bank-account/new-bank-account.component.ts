import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import isNil from 'lodash.isnil';

import { BankContent } from '../../../../../../../../api-codegen/aggr-proxy/swagger-codegen';

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
        if (isNil(this.form.get('newBankAccount.bankName'))) {
            throw new Error(`Form doesn't contains newBankAccount.bankName control`);
        }

        return this.form.get('newBankAccount.bankName') as FormControl;
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
