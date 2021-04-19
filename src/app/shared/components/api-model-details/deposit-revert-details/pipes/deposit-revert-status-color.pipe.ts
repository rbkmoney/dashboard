import { Pipe, PipeTransform } from '@angular/core';

import { DepositRevert } from '@dsh/api-codegen/wallet-api';

import { StatusColor } from '../../../../../theme-manager';

@Pipe({
    name: 'depositRevertStatusColor',
})
export class DepositRevertStatusColorPipe implements PipeTransform {
    transform(status: DepositRevert.StatusEnum): StatusColor {
        const statuses = DepositRevert.StatusEnum;
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
