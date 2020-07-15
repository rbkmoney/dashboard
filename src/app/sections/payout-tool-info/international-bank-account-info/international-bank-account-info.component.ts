import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '../../../../utils';
import { PayoutToolDetailsInternationalBankAccount } from '../../../api-codegen/anapi';

@Component({
    selector: 'dsh-international-bank-account-info',
    templateUrl: 'international-bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalBankAccountInfoComponent {
    @Input() @coerceBoolean hideTitle: boolean;
    @Input() payoutTool: PayoutToolDetailsInternationalBankAccount;
}
