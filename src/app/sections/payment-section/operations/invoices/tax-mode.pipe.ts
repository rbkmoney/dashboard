import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceLineTaxVAT } from '../../../../api-codegen/anapi';

const RateEnum = InvoiceLineTaxVAT.RateEnum;

@Pipe({
    name: 'taxMode'
})
export class TaxModePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: typeof RateEnum[keyof typeof RateEnum]): string {
        if (RateEnum[value] === RateEnum._0) {
            return this.transloco.translate('withoutVAT', null, 'invoices|scoped');
        }
        return RateEnum[value];
    }
}
