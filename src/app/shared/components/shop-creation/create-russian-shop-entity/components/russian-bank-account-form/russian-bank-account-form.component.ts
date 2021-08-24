import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { BankContent } from '../../../../../../api-codegen/aggr-proxy';
import { RussianBankAccountForm } from './types/bank-account-form-data';

@Component({
    selector: 'dsh-russian-bank-account-form',
    templateUrl: 'russian-bank-account-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(RussianBankAccountFormComponent),
})
export class RussianBankAccountFormComponent extends ValidatedWrappedAbstractControlSuperclass<RussianBankAccountForm> {
    formControl = this.fb.group<RussianBankAccountForm>({
        account: null,
        bankName: null,
        bankPostAccount: null,
        bankBik: null,
    });
    searchControl = this.fb.control<string>('');

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    bankSelected(bank: BankContent): void {
        this.formControl.patchValue({
            bankName: bank?.value || null,
            bankBik: bank?.bic || null,
            bankPostAccount: bank?.correspondentAccount || null,
        });
    }
}
