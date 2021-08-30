import { DepositStatusFilterValue } from '../deposit-status-filter/types/deposit-status-filter-value';
import { DepositSumFilter } from '../deposit-sum-filter';
import { MainInfoFilters } from '../main-info-filters';

export interface AdditionalFiltersForm {
    main: MainInfoFilters;
    depositStatus: DepositStatusFilterValue;
    depositSum: DepositSumFilter;
}
