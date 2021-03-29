import { DepositStatusFilterValue } from '../deposit-status-filter/types/deposit-status-filter-value';
import { DepositSumFilter } from '../deposit-sum-filter';
import { MainFilters } from '../main-filters';

export interface AdditionalFiltersForm {
    main: MainFilters;
    depositStatus: DepositStatusFilterValue;
    depositSum: DepositSumFilter;
}
