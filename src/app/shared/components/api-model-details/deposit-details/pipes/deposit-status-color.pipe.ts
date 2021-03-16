import { Pipe, PipeTransform } from '@angular/core';

import { Deposit } from '@dsh/api-codegen/wallet-api';

import { StatusColor } from '../../../../../theme-manager';

@Pipe({
    name: 'depositStatusColor',
})
export class DepositStatusColorPipe implements PipeTransform {
    transform(status: Deposit.StatusEnum): StatusColor {
        const statuses = Deposit.StatusEnum;
        switch (status) {
            case statuses.Succeeded:
                return StatusColor.success;
            case statuses.Failed:
                return StatusColor.warn;
            case statuses.Pending:
                return StatusColor.pending;
            default:
                return StatusColor.neutral;
        }
    }
}
