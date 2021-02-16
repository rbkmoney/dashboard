import { getAmountNum } from './get-amount-num';

describe('getAmountNum', () => {
    it('should return valid num parsing provided amount', () => {
        expect(getAmountNum('22,54')).toBe(22.54);
    });

    it('should return null if amount cannot be parsed in number', () => {
        expect(getAmountNum('22,,')).toBeNull();
    });

    it('should return null if amount is null', () => {
        expect(getAmountNum(null)).toBeNull();
    });

    it('should return null if amount is empty string', () => {
        expect(getAmountNum('')).toBeNull();
    });
});
