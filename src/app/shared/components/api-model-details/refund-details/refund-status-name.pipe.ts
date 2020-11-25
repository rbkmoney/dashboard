import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { RefundSearchResult } from '../../../../api-codegen/capi/swagger-codegen';

@Pipe({
    name: 'refundStatusName',
})
export class RefundStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: RefundSearchResult.StatusEnum): string {
        const statuses = RefundSearchResult.StatusEnum;
        switch (status) {
            case statuses.Succeeded:
            case statuses.Failed:
            case statuses.Pending:
                return this.transloco.translate(`refundStatus.${status}`);
            default:
                return status;
        }
    }
}
