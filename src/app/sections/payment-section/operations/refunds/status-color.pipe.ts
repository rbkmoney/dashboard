import { Pipe, PipeTransform } from '@angular/core';

import { RefundStatus } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'refundStatusColor'
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: RefundStatus.StatusEnum): StatusColor {
        const statusEnum = RefundStatus.StatusEnum;
        switch (status) {
            case statusEnum.Succeeded:
                return StatusColor.success;
            case statusEnum.Failed:
                return StatusColor.warn;
            case statusEnum.Pending:
                return StatusColor.pending;
        }
    }
}
