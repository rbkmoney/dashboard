import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';

@Pipe({
    name: 'withdrawalStatusName',
})
export class WithdrawalStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Withdrawal.StatusEnum): string {
        const statuses = Withdrawal.StatusEnum;
        switch (status) {
            case statuses.Succeeded:
            case statuses.Failed:
            case statuses.Pending:
                return this.transloco.translate(`details.statuses.${status}`, null, 'withdrawals');
            default:
                return status;
        }
    }
}
