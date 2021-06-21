import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';

import { InvoiceStatus } from '@dsh/api-codegen/anapi';

@Pipe({ name: 'invoiceStatusLabel' })
export class InvoiceStatusLabelPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) {}

    transform(value: InvoiceStatus.StatusEnum): Observable<string> {
        if (!value) return of('');
        return this.translocoService.selectTranslate(`statuses.${value}`, {}, 'invoice-status-field');
    }
}
