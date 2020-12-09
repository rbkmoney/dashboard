import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { Range } from '@dsh/components/form-controls';

export interface FormParams {
    date: Range;
    walletID?: string;
    identityID?: string;
    withdrawalID?: string;
    destinationID?: string;
    status?: WithdrawalStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
