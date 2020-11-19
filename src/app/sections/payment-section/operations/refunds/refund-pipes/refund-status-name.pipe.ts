import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { RefundSearchResult } from '../../../../../api-codegen/anapi/swagger-codegen';

@Pipe({
    name: 'refundStatusName',
})
export class RefundStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: RefundSearchResult.StatusEnum): string {
        switch (status) {
            case 'succeeded':
            case 'failed':
            case 'pending':
                return this.transloco.translate(`refunds.status.${status}`, null, 'operations');
            default:
                return status;
        }
    }
}
