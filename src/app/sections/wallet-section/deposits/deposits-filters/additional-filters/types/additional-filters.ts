import { DepositStatus } from '@dsh/api-codegen/wallet-api';

import { MainFilters } from '../main-filters';
import { DepositAmountFilterData } from './deposit-amount-filter-data';

export type AdditionalFilters = Partial<MainFilters> &
    Partial<DepositAmountFilterData> & {
        depositStatus?: DepositStatus.StatusEnum;
    };
