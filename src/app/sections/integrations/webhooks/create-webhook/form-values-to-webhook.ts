import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { FormParams } from './form-params';

// type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
// type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

const getTopic = () => 'InvoicesTopic';

export const formValuesToWebhook = (v: FormParams): Webhook =>
    ({
        url: v.url,
        scope: {
            shopID: v.shop,
            eventTypes: v.types,
            topic: getTopic()
        }
    } as Webhook);
