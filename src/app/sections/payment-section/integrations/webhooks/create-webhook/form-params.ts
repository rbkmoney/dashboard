import { InvoicesTopic } from '../../../../../api-codegen/capi/swagger-codegen';

interface EventType {
    eventName: InvoicesTopic.EventTypesEnum;
    selected: boolean;
}

export interface FormParams {
    shop: string;
    url: string;
    eventTypes: EventType[];
}
