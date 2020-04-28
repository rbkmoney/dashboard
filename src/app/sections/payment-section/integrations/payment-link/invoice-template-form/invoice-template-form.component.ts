import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { InvoiceLineTaxVAT } from '../../../../../api-codegen/capi';
import { CostType, InvoiceTemplateFormService, TemplatType, withoutVAT } from './invoice-template-form.service';

@Component({
    selector: 'dsh-invoice-template-form',
    templateUrl: 'invoice-template-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceTemplateFormComponent {
    @Output()
    next = new EventEmitter<void>();

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = withoutVAT;

    templateType = TemplatType;
    costType = CostType;

    templateTypes = Object.entries(TemplatType);
    costTypes = Object.entries(CostType);

    form = this.invoiceTemplateFormService.form;

    get cartForm() {
        return this.invoiceTemplateFormService.cartForm;
    }

    constructor(private invoiceTemplateFormService: InvoiceTemplateFormService) {}

    clear() {
        this.invoiceTemplateFormService.clear();
    }

    addProduct() {
        this.invoiceTemplateFormService.addProduct();
    }

    removeProduct(idx: number) {
        this.invoiceTemplateFormService.removeProduct(idx);
    }
}
