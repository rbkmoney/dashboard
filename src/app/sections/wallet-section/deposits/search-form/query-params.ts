import { DepositStatus } from '../../../../api-codegen/wallet-api/swagger-codegen';

export interface QueryParams {
    fromTime: string;
    toTime: string;
    walletID?: string;
    identityID?: string;
    depositID?: string;
    sourceID?: string;
    status?: DepositStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
