import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api';

export type WithdrawalStatusFilterValue = WithdrawalStatus.StatusEnum | null;

@Component({
    selector: 'dsh-withdrawal-status-filter',
    templateUrl: './withdrawal-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalStatusFilterComponent {
    @Input() control: FormControl<WithdrawalStatusFilterValue>;

    statuses = Object.values(WithdrawalStatus.StatusEnum);
}
