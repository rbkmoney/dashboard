import { Pipe, PipeTransform } from '@angular/core';

import { DepositStatus, WithdrawalStatus } from '../../api-codegen/wallet-api/swagger-codegen';
import { StatusColor as Color } from '../../theme-manager';

type Status = DepositStatus.StatusEnum | WithdrawalStatus.StatusEnum;

@Pipe({
    name: 'statusToColor',
})
export class StatusToColorPipe implements PipeTransform {
    transform(status: Status): Color {
        switch (status) {
            case 'Succeeded':
                return Color.success;
            case 'Pending':
                return Color.pending;
            case 'Failed':
                return Color.warn;
        }
    }
}
