import { Pipe, PipeTransform } from '@angular/core';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';

import { StatusColor } from '../../../../../theme-manager';

@Pipe({
    name: 'withdrawalStatusColor',
})
export class WithdrawalStatusColorPipe implements PipeTransform {
    transform(status: Withdrawal.StatusEnum): StatusColor {
        const statuses = Withdrawal.StatusEnum;
        switch (status) {
            case statuses.Succeeded:
                return StatusColor.Success;
            case statuses.Failed:
                return StatusColor.Warn;
            case statuses.Pending:
                return StatusColor.Pending;
            default:
                return StatusColor.Neutral;
        }
    }
}
