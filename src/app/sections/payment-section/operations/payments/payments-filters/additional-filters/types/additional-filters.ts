import { MainFilters } from '../main-filters';
import { StatusFilters } from '../status-filters';
import { PaymentAmountFilterData } from './payment-amount-filter-data';

export type AdditionalFilters = Partial<MainFilters> & Partial<StatusFilters> & Partial<PaymentAmountFilterData>;
