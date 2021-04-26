import { Pipe, PipeTransform } from '@angular/core';

import { WithdrawalStatus } from '../../../app/api-codegen/wallet-api/swagger-codegen';
import { StatusColor as Color } from '../../../app/theme-manager';

@Pipe({
    name: 'statusToColor',
})
export class StatusToColorPipe implements PipeTransform {
    transform(status: WithdrawalStatus.StatusEnum): Color {
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
