import { Range } from '@dsh/components/form-controls';

import { DepositStatus } from '../../../../api-codegen/wallet-api/swagger-codegen';

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
