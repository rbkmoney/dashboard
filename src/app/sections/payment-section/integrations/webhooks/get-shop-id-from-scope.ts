import { CustomersTopic, InvoicesTopic, WebhookScope } from '@dsh/api-codegen/capi';

export const getShopIdFromScope = (scope: WebhookScope): string | null =>
    (scope as InvoicesTopic).shopID || (scope as CustomersTopic).shopID;
