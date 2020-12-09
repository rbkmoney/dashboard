import { DepositStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { Range } from '@dsh/components/form-controls';

export interface FormParams {
    date: Range;
    walletID?: string;
    identityID?: string;
    depositID?: string;
    sourceID?: string;
    status?: DepositStatus.StatusEnum;
    amountFrom?: number;
    amountTo?: number;
    currencyID?: string;
}
