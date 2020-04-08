import { InvoicesTopic } from '../../../../../api-codegen/capi/swagger-codegen';

type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

const invoiceTypes = [
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

export const TYPES = invoiceTypes;
