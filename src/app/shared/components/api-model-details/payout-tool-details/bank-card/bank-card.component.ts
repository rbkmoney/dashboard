import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutToolDetailsBankCard } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-bank-card',
    templateUrl: 'bank-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCardComponent {
    @Input() bankCard: PayoutToolDetailsBankCard;
}
