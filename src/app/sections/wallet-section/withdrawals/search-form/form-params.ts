import { Range } from '@dsh/components/form-controls';

import { WithdrawalStatus } from '../../../../api-codegen/wallet-api/swagger-codegen';

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
