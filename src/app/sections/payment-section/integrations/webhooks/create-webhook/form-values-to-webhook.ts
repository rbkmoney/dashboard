import { Webhook } from '../../../../../api-codegen/capi/swagger-codegen';
import { FormParams } from './form-params';

export const formValuesToWebhook = (v: FormParams): Webhook =>
    ({
        url: v.url,
        scope: {
            shopID: v.shop,
            eventTypes: v.eventTypes.filter(e => e.selected).map(e => e.eventName),
            topic: 'InvoicesTopic'
        }
    } as Webhook);
