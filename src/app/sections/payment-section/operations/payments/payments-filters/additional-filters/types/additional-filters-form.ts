import { MainFilters } from '../main-filters';
import { PaymentSumFilter } from '../payment-sum-filter';
import { StatusFilters } from '../status-filters';

export interface AdditionalFiltersForm {
    main: MainFilters;
    status: StatusFilters;
    paymentSum: PaymentSumFilter;
}
