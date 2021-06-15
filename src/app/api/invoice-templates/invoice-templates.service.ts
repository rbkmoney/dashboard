import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';

import {
    InvoiceTemplateCreateParams,
    InvoiceTemplatesService as InvoiceTemplatesApiService,
} from '@dsh/api-codegen/capi';

@Injectable()
export class InvoiceTemplatesService {
    constructor(private invoiceTemplatesService: InvoiceTemplatesApiService, private idGenerator: IdGeneratorService) {}

    createInvoiceTemplate(params: InvoiceTemplateCreateParams) {
        return this.invoiceTemplatesService.createInvoiceTemplate(this.idGenerator.shortUuid(), params);
    }

    getInvoicePaymentMethodsByTemplateID(invoiceTemplateID: string) {
        return this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(
            this.idGenerator.shortUuid(),
            invoiceTemplateID
        );
    }
}
