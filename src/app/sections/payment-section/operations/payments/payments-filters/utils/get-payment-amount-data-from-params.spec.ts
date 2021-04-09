import { getPaymentAmountDataFromParams } from './get-payment-amount-data-from-params';

describe('getPaymentAmountDataFromParams', () => {
    it('should format amount params in numeric major form', () => {
        expect(
            getPaymentAmountDataFromParams({
                paymentAmountFrom: '500',
                paymentAmountTo: '500',
            })
        ).toEqual({
            paymentAmountFrom: 5,
            paymentAmountTo: 5,
        });
    });

    it('should ignore non parsable in string numbers', () => {
        expect(
            getPaymentAmountDataFromParams({
                paymentAmountFrom: '560',
                paymentAmountTo: '50,',
            })
        ).toEqual({
            paymentAmountFrom: 5.6,
        });
    });

    it('should ignore non provided params', () => {
        expect(
            getPaymentAmountDataFromParams({
                paymentAmountTo: '500',
            })
        ).toEqual({
            paymentAmountTo: 5,
        });
    });

    it('should return empty object if params were invalid', () => {
        expect(
            getPaymentAmountDataFromParams({
                paymentAmountFrom: '50,',
                paymentAmountTo: ',500',
            })
        ).toEqual({});
    });

    it('should return empty object if params were an empty object', () => {
        expect(getPaymentAmountDataFromParams({})).toEqual({});
    });
});
