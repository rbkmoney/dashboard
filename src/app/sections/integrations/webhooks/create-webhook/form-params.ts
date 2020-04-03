import { InvoicesTopic } from '../../../../api-codegen/capi/swagger-codegen';

type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

export class FormParams {
    shop: string;
    url: string;
    types: InvoicesEventTypesEnum[];
}
