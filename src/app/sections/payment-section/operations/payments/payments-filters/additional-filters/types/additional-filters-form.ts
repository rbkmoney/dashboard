import { BankCardTokenProvider, BankCardPaymentSystem, PaymentStatus } from '@dsh/api-codegen/anapi';

import { CardFilterForm } from '../card-filter';
import { InvoicesFilterForm } from '../invoices-filter';
import { MainFiltersForm } from '../main-filters';
import { PaymentSumFilterForm } from '../payment-sum-filter';
import { ShopsFilterForm } from '../shops-filter';

export interface AdditionalFiltersForm {
    main: MainFiltersForm;
    paymentStatus: PaymentStatus.StatusEnum;
    paymentSum: PaymentSumFilterForm;
    tokenProvider: BankCardTokenProvider;
    paymentSystem: BankCardPaymentSystem;
    invoices: InvoicesFilterForm;
    shops: ShopsFilterForm;
    binPan: CardFilterForm;
}
