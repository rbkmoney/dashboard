import { MainFilters } from '../main-filters';
import { PaymentStatusFilterValue } from '../payment-status-filter/types/payment-status-filter-value';
import { PaymentAmountFilterData } from './payment-amount-filter-data';

export type AdditionalFilters = Partial<MainFilters> & {
    paymentStatus?: PaymentStatusFilterValue;
} & Partial<PaymentAmountFilterData>;
