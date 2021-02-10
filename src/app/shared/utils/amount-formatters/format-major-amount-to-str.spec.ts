import { formatMajorAmountToStr } from './format-major-amount-to-str';

describe('formatMajorAmountToStr', () => {
    it('should replace dot to comma', () => {
        expect(formatMajorAmountToStr(500.6)).toBe('500,6');
    });

    it('should return value as is if there is no dots', () => {
        expect(formatMajorAmountToStr(500)).toBe('500');
    });

    it('should return empty string if value is null', () => {
        expect(formatMajorAmountToStr(null)).toBe('');
    });

    it('should return empty string if value is NaN', () => {
        expect(formatMajorAmountToStr(NaN)).toBe('');
    });
});
