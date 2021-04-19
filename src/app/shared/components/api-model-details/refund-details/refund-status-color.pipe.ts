import { Pipe, PipeTransform } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'refundStatusColor',
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: RefundSearchResult.StatusEnum): StatusColor {
        const statuses = RefundSearchResult.StatusEnum;
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
