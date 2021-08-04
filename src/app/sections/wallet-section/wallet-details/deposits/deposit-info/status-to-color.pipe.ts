import { Pipe, PipeTransform } from '@angular/core';

import { DepositStatus } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { StatusColor as Color } from '../../../../../theme-manager';

@Pipe({
    name: 'statusToColor',
})
export class StatusToColorPipe implements PipeTransform {
    transform(status: DepositStatus.StatusEnum): Color {
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
