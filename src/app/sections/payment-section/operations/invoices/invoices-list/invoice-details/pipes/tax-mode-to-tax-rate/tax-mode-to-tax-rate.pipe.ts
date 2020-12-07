import { Pipe, PipeTransform } from '@angular/core';

import { InvoiceLineTaxMode, InvoiceLineTaxVAT } from '../../../../../../../../api-codegen/anapi';

@Pipe({
    name: 'taxModeToTaxRate',
})
export class TaxModeToTaxRatePipe implements PipeTransform {
    transform(taxMode: InvoiceLineTaxMode): string {
        switch (taxMode.type) {
            case InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT:
                return (taxMode as InvoiceLineTaxVAT).rate;
        }
    }
}
