import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CorrespondentAccount, InternationalBankAccount } from '@dsh/api-codegen/questionary';

import { CountryCodes } from '../../../create-shop/create-shop-international-legal-entity/country-codes';

@Component({
    selector: 'dsh-international-bank-account-info',
    templateUrl: 'international-bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalBankAccountInfoComponent {
    @Input() bankAccount: InternationalBankAccount | CorrespondentAccount;

    hasCorrespondentAccount(acc: CorrespondentAccount): boolean {
        return !!Object.entries(acc?.bank || {}).length;
    }

    getCountryCodeText(num): string {
        return CountryCodes[num];
    }
}
