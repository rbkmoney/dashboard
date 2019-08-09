import { RefundSearchFormValue } from './search-form/refund-search-form-value';
import { RefundSearchParams } from '../../../../search/refund-search-params';

export const refundSearchConverter = (formValue: RefundSearchFormValue, limit: number): RefundSearchParams => ({
    ...formValue,
    limit,
    excludedShops: formValue.excludedShops.split(',')
});
