import { Pipe, PipeTransform } from '@angular/core';

import { DepositStatus, WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { StatusColor as Color } from '../../theme-manager';

type Status = DepositStatus.StatusEnum | WithdrawalStatus.StatusEnum;

@Pipe({
    name: 'statusToColor',
})
export class StatusToColorPipe implements PipeTransform {
    transform(status: Status): Color {
        switch (status) {
            case 'Succeeded':
                return Color.Success;
            case 'Pending':
                return Color.Pending;
            case 'Failed':
                return Color.Warn;
        }
    }
}
