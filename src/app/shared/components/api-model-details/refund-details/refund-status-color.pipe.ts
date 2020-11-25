import { Pipe, PipeTransform } from '@angular/core';

import { RefundSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'refundStatusColor',
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: RefundSearchResult.StatusEnum): StatusColor {
        const statuses = RefundSearchResult.StatusEnum;
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
