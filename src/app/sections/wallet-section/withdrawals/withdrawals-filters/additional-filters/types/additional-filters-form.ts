import { MainInfoFilters } from '../main-info-filters';
import { WithdrawalStatusFilterValue } from '../withdrawal-status-filter';
import { WithdrawalSumFilter } from '../withdrawal-sum-filter';

export interface AdditionalFiltersForm {
    main: MainInfoFilters;
    status: WithdrawalStatusFilterValue;
    withdrawalSum: WithdrawalSumFilter;
}
