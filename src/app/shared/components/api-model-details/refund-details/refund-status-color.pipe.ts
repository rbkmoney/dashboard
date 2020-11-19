import { Pipe, PipeTransform } from '@angular/core';

import { RefundSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'refundStatusColor',
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: RefundSearchResult.StatusEnum): StatusColor {
        switch (status) {
            case 'succeeded':
                return StatusColor.success;
            case 'failed':
                return StatusColor.warn;
            case 'pending':
                return StatusColor.pending;
            default:
                return StatusColor.neutral;
        }
    }
}
