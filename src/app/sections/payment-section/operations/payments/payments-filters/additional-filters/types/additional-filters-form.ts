import { MainFilters } from '../main-filters';
import { PaymentStatusFilterValue } from '../payment-status-filter/types/payment-status-filter-value';
import { PaymentSumFilter } from '../payment-sum-filter';

export interface AdditionalFiltersForm {
    main: MainFilters;
    paymentStatus: PaymentStatusFilterValue;
    paymentSum: PaymentSumFilter;
}
