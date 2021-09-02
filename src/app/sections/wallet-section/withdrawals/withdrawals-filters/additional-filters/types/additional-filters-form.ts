import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api';

import { MainInfoForm } from '../main-info-filters';
import { WithdrawalAmountForm } from '../withdrawal-sum-filter';

export interface AdditionalFiltersForm {
    mainInfo?: MainInfoForm;
    status?: WithdrawalStatus.StatusEnum;
    amount?: WithdrawalAmountForm;
}
