import { MainFilters } from '../main-filters';
import { PaymentStatusFilterValue } from '../payment-status-filter/types/payment-status-filter-value';
import { PaymentSystemFilterValue } from '../payment-system-filter/types/payment-system-filter-value';
import { TokenProviderFilterValue } from '../token-provider-filter/types/token-provider-filter-value';
import { PaymentAmountFilterData } from './payment-amount-filter-data';

export type AdditionalFilters = Partial<MainFilters> &
    Partial<PaymentAmountFilterData> & {
        paymentStatus?: PaymentStatusFilterValue;
        bankCardTokenProvider?: TokenProviderFilterValue;
        bankCardPaymentSystem?: PaymentSystemFilterValue;
    };
