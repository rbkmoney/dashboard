import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CorrespondentAccount, InternationalBankAccount } from '../../../../api-codegen/questionary';

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
}
