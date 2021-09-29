import { PaymentStatus, BankCardPaymentSystem, BankCardTokenProvider } from '@dsh/api-codegen/anapi';

import { CardFilterForm } from '../card-filter';
import { InvoicesFilterForm } from '../invoices-filter';
import { MainFiltersForm } from '../main-filters';
import { PaymentSumFilterForm } from '../payment-sum-filter';
import { ShopsFilterForm } from '../shops-filter';

export type AdditionalFilters = Partial<MainFiltersForm> &
    Partial<PaymentSumFilterForm> &
    Partial<InvoicesFilterForm> &
    Partial<ShopsFilterForm> &
    Partial<CardFilterForm> & {
        binPan?: CardFilterForm;
        paymentStatus?: PaymentStatus.StatusEnum;
        tokenProvider?: BankCardTokenProvider;
        paymentSystem?: BankCardPaymentSystem;
    };
