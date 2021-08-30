import { MainFilters } from '../main-filters';
import { WithdrawalStatusFilterValue } from '../withdrawal-status-filter';
import { WithdrawalAmountFilterData } from './withdrawal-amount-filter-data';

export type AdditionalFilters = Partial<MainFilters> &
    Partial<WithdrawalAmountFilterData> & {
        status?: WithdrawalStatusFilterValue;
    };
