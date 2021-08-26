import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Withdrawal } from '@dsh/api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-withdrawals-list',
    templateUrl: 'withdrawals-list.component.html',
    styleUrls: ['withdrawals-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalsListComponent {
    @Input() withdrawals: Withdrawal[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
