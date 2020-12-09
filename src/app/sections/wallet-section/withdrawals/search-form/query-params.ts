import { DepositStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';

export interface QueryParams {
    fromTime: string;
    toTime: string;
    walletID?: string;
    identityID?: string;
    withdrawalID?: string;
    destinationID?: string;
    status?: DepositStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
