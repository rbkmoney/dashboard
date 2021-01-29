import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isEmpty from 'lodash.isempty';

import { isNumber } from '@dsh/app/shared/utils';

@Component({
    selector: 'dsh-balance',
    templateUrl: 'balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
    @Input() amount: number;
    @Input() currency: string;

    get isBalanceProvided(): boolean {
        return isNumber(this.amount) && !isEmpty(this.currency);
    }
}
