import { Webhook, WebhookScope } from '../../../../../../api-codegen/wallet-api';
import { FormParams } from './form-params';
import TopicEnum = WebhookScope.TopicEnum;

export const formValuesToWebhook = (v: FormParams, topic: TopicEnum): Webhook =>
    ({
        identityID: v.identityID,
        url: v.url,
        scope: {
            ...(v.walletID ? { walletID: v.walletID } : {}),
            eventTypes: v.eventTypes.filter((e) => e.selected).map((e) => e.eventName),
            topic,
        },
    } as Webhook);
