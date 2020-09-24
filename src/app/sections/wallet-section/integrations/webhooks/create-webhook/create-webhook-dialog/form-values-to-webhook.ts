import { Webhook } from '../../../../../../api-codegen/wallet-api';
import { FormParams } from './form-params';

export const formValuesToWebhook = (v: FormParams): Webhook =>
    ({
        identityID: v.identityID,
        url: v.url,
        scope: {
            ...(v.walletID ? { walletID: v.walletID } : {}),
            eventTypes: v.eventTypes.filter((e) => e.selected).map((e) => e.eventName),
            topic: v.eventType,
        },
    } as Webhook);
