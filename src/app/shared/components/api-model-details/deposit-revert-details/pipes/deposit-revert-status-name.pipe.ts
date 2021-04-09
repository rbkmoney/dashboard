import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { DepositRevert } from '@dsh/api-codegen/wallet-api';

@Pipe({
    name: 'depositRevertStatusName',
})
export class DepositRevertStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: DepositRevert.StatusEnum): string {
        const statuses = DepositRevert.StatusEnum;
        switch (status) {
            case statuses.Failed:
            case statuses.Succeeded:
            case statuses.Pending:
                return this.transloco.translate(`depositRevertStatus.${status}`);
            default:
                return status;
        }
    }
}
