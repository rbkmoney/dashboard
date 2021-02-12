import { MainFilters } from '../main-filters';
import { PaymentStatusFilterValue } from '../payment-status-filter/types/payment-status-filter-value';
import { PaymentSumFilter } from '../payment-sum-filter';
import { PaymentSystemFilterValue } from '../payment-system-filter/types/payment-system-filter-value';
import { TokenProviderFilterValue } from '../token-provider-filter/types/token-provider-filter-value';

export interface AdditionalFiltersForm {
    main: MainFilters;
    paymentStatus: PaymentStatusFilterValue;
    paymentSum: PaymentSumFilter;
    bankCardTokenProvider: TokenProviderFilterValue;
    bankCardPaymentSystem: PaymentSystemFilterValue;
}
