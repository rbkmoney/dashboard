import { DestinationsTopic, WithdrawalsTopic } from '../../../../../../api-codegen/wallet-api/swagger-codegen';

interface EventType {
    eventName: WithdrawalsTopic.EventTypesEnum | DestinationsTopic.EventTypesEnum;
    selected: boolean;
}

export interface FormParams {
    identityID: string;
    url: string;
    walletID?: string;
    eventTypes: EventType[];
}
