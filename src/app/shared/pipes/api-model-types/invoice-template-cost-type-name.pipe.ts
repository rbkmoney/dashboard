import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceTemplateLineCostType } from '@dsh/api/capi';

@Pipe({
    name: 'invoiceTemplateCostTypeName',
})
export class InvoiceTemplateCostTypeNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(type: InvoiceTemplateLineCostType): string {
        switch (type) {
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed:
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange:
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim:
                return this.transloco.translate(`invoiceTemplateCostType.${type}`);
            default:
                return type;
        }
    }
}
