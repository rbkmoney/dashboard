import { InvoicesTopic } from '../../../../api-codegen/capi/swagger-codegen';

// type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

export const invoiceTypes = [
    'InvoiceCreated',
    'InvoicePaid',
    'InvoiceCancelled',
    'InvoiceFulfilled',
    'PaymentStarted',
    'PaymentProcessed',
    'PaymentCaptured',
    'PaymentCancelled',
    'PaymentRefunded',
    'PaymentFailed',
    'PaymentRefundCreated',
    'PaymentRefundSucceeded',
    'PaymentRefundFailed'
] as InvoicesEventTypesEnum[];

// export const customerTypes = [
//     'CustomerCreated',
//     'CustomerDeleted',
//     'CustomerReady',
//     'CustomerBindingStarted',
//     'CustomerBindingSucceeded',
//     'CustomerBindingFailed'
// ] as CustomersEventTypesEnum[];

export const TYPES = [...invoiceTypes];
