import { RefundSearchFormValue } from './search-form/refund-search-form-value';

export const refundSearchConverter = (formValue: RefundSearchFormValue): RefundSearchFormValue => ({
    ...formValue,
    excludedShops: formValue.excludedShops.split(',').join()
});
