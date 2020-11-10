import { CustomersTopic, InvoicesTopic, WebhookScope } from '../../../../api-codegen/capi/swagger-codegen';

export const getShopIdFromScope = (scope: WebhookScope): string | null =>
    (scope as InvoicesTopic).shopID || (scope as CustomersTopic).shopID;
