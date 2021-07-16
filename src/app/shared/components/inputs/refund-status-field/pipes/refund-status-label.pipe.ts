import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { RefundStatus } from '@dsh/api-codegen/dark-api';

@Pipe({ name: 'refundStatusLabel' })
export class RefundStatusLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: RefundStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`statuses.${value}`, {}, 'refund-status-field');
    }
}
