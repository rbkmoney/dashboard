import { DepositStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';

export class DepositsSearchParams {
    fromTime?: string;
    toTime?: string;
    walletID?: string;
    identityID?: string;
    depositID?: string;
    sourceID?: string;
    status?: DepositStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
