import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '../../../../utils';
import { PayoutToolDetailsBankCard } from '../../../api-codegen/anapi';

@Component({
    selector: 'dsh-bank-card-info',
    templateUrl: 'bank-card-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardInfoComponent {
    @Input() @coerceBoolean hideTitle: boolean;
    @Input() payoutTool: PayoutToolDetailsBankCard;
}
