import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Deposit } from '@dsh/api-codegen/wallet-api';

@Pipe({
    name: 'depositStatusName',
})
export class DepositStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Deposit.StatusEnum): string {
        const statuses = Deposit.StatusEnum;
        switch (status) {
            case statuses.Failed:
            case statuses.Succeeded:
            case statuses.Pending:
                return this.transloco.translate(`depositStatus.${status}`);
            default:
                return status;
        }
    }
}
