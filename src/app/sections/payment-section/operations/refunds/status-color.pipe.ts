import { Pipe, PipeTransform } from '@angular/core';

import { RefundStatus } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';

@Pipe({
    name: 'refundStatusColor'
})
export class RefundStatusColorPipe implements PipeTransform {
    transform(status: RefundStatus.StatusEnum): Color {
        const statusEnum = RefundStatus.StatusEnum;
        switch (status) {
            case statusEnum.Succeeded:
                return Color.success;
            case statusEnum.Failed:
                return Color.warn;
            case statusEnum.Pending:
                return Color.pending;
        }
    }
}
