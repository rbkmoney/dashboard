import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceTemplateType } from '@dsh/api/capi';

@Pipe({
    name: 'invoiceTemplateTypeName',
})
export class InvoiceTemplateTypeNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(type: InvoiceTemplateType): string {
        switch (type) {
            case InvoiceTemplateType.InvoiceTemplateMultiLine:
            case InvoiceTemplateType.InvoiceTemplateSingleLine:
                return this.transloco.translate(`invoiceTemplateType.${type}`);
            default:
                return type;
        }
    }
}
