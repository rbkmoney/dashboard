import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CountryCodesService } from '@dsh/app/shared/services/country-codes/country-codes.service';

import { CorrespondentAccount, InternationalBankAccount } from '@dsh/api-codegen/questionary';

@Component({
    selector: 'dsh-international-bank-account-info',
    templateUrl: 'international-bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalBankAccountInfoComponent {
    @Input() bankAccount: InternationalBankAccount | CorrespondentAccount;

    constructor(private countryCodes: CountryCodesService) {}

    hasCorrespondentAccount(acc: CorrespondentAccount): boolean {
        return !!Object.entries(acc?.bank || {}).length;
    }

    getCountryCodeText(code: number): string {
        return this.countryCodes.getCountryByCode(code);
    }
}
