import { MainFilters } from '../main-filters';
import { WithdrawalStatusFilterValue } from '../withdrawal-status-filter';
import { WithdrawalSumFilter } from '../withdrawal-sum-filter';

export interface AdditionalFiltersForm {
    main: MainFilters;
    status: WithdrawalStatusFilterValue;
    withdrawalSum: WithdrawalSumFilter;
}
