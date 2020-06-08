import { WithdrawalStatus } from '../../api-codegen/wallet-api/swagger-codegen';

export class WithdrawalsSearchParams {
    fromTime?: string;
    toTime?: string;
    walletID?: string;
    identityID?: string;
    withdrawalID?: string;
    destinationID?: string;
    status?: WithdrawalStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
