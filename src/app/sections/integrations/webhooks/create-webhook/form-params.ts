import { CustomersTopic, InvoicesTopic } from '../../../../api-codegen/capi/swagger-codegen';

type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

export class FormParams {
    shop: string;
    url: string;
    types: InvoicesEventTypesEnum[] | CustomersEventTypesEnum[];
}
