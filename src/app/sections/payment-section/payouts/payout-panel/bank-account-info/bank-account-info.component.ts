import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutToolDetailsBankAccount } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-bank-account-info',
    templateUrl: 'bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountInfoComponent {
    @Input() payoutTool: PayoutToolDetailsBankAccount;
}
