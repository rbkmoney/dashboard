import { Webhook } from '../../../../../api-codegen/capi';
import { FormParams } from './form-params';

export const formValuesToWebhook = (v: FormParams): Webhook =>
    ({
        url: v.url,
        scope: {
            ...(v.shopID ? { shopID: v.shopID } : {}),
            eventTypes: v.eventTypes.filter((e) => e.selected).map((e) => e.eventName),
            topic: v.eventType,
        },
    } as Webhook);
