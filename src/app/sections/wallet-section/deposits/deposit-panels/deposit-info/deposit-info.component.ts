import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Deposit } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-deposit-info',
    templateUrl: 'deposit-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositInfoComponent {
    @Input() deposit: Deposit;
    @Output() refreshData = new EventEmitter<void>();
}
