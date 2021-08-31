import { MainInfoFilters } from '../main-info-filters';
import { WithdrawalStatusFilterValue } from '../withdrawal-status-filter';
import { WithdrawalAmountFilterData } from './withdrawal-amount-filter-data';

export type AdditionalFilters = Partial<MainInfoFilters> &
    Partial<WithdrawalAmountFilterData> & {
        status?: WithdrawalStatusFilterValue;
    };
