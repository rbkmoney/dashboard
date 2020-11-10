import TopicEnum = WebhookScope.TopicEnum;
import { CustomersTopic, InvoicesTopic, WebhookScope } from '../../../../../api-codegen/capi/swagger-codegen';

export const getEventsByTopic = (topic: TopicEnum): string[] => {
    switch (topic) {
        case 'InvoicesTopic':
            return Object.values(InvoicesTopic.EventTypesEnum);
        case 'CustomersTopic':
            return Object.values(CustomersTopic.EventTypesEnum);
    }
};
