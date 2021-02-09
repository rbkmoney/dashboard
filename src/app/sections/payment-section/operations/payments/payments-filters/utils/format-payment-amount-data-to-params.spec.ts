import { formatPaymentAmountDataToParams } from './format-payment-amount-data-to-params';

describe('formatPaymentAmountDataToParams', () => {
    it('should return stringyfied minor values of both params', () => {
        expect(
            formatPaymentAmountDataToParams({
                paymentAmountFrom: 600,
                paymentAmountTo: 800,
            })
        ).toEqual({
            paymentAmountFrom: '60000',
            paymentAmountTo: '80000',
        });
    });

    it('should null instead of value if param was not provided', () => {
        expect(
            formatPaymentAmountDataToParams({
                paymentAmountTo: 800,
            })
        ).toEqual({
            paymentAmountFrom: null,
            paymentAmountTo: '80000',
        });
    });

    it('should null instead of value if param is NaN', () => {
        expect(
            formatPaymentAmountDataToParams({
                paymentAmountFrom: 600,
                paymentAmountTo: NaN,
            })
        ).toEqual({
            paymentAmountFrom: '60000',
            paymentAmountTo: null,
        });
    });

    it('should return nullable params if both values was not provided', () => {
        expect(formatPaymentAmountDataToParams({})).toEqual({
            paymentAmountFrom: null,
            paymentAmountTo: null,
        });
    });
});
