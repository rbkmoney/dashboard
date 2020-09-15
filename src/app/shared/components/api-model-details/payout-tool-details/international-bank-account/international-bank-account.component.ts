import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
    InternationalCorrespondentBankAccount,
    PayoutToolDetailsInternationalBankAccount,
} from '../../../../../api-codegen/capi';

@Component({
    selector: 'dsh-international-bank-account',
    templateUrl: 'international-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalBankAccountComponent {
    @Input() internationalBankAccount:
        | PayoutToolDetailsInternationalBankAccount
        | InternationalCorrespondentBankAccount;
}
