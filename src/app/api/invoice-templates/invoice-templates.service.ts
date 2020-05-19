import { Injectable } from '@angular/core';

import {
    InvoiceTemplateCreateParams,
    InvoiceTemplatesService as InvoiceTemplatesApiService,
} from '../../api-codegen/capi';
import { genXRequestID } from '../utils';

@Injectable()
export class InvoiceTemplatesService {
    constructor(private invoiceTemplatesService: InvoiceTemplatesApiService) {}

    createInvoiceTemplate(params: InvoiceTemplateCreateParams) {
        return this.invoiceTemplatesService.createInvoiceTemplate(genXRequestID(), params);
    }

    getInvoicePaymentMethodsByTemplateID(invoiceTemplateID: string) {
        return this.invoiceTemplatesService.getInvoicePaymentMethodsByTemplateID(genXRequestID(), invoiceTemplateID);
    }
}
