import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '../../../../utils';
import { PayoutToolDetailsBankAccount } from '../../../api-codegen/anapi';

@Component({
    selector: 'dsh-bank-account-info',
    templateUrl: 'bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountInfoComponent {
    @Input() @coerceBoolean hideTitle: boolean;
    @Input() payoutTool: PayoutToolDetailsBankAccount;
}
