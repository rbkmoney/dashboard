import { formatVisualDot } from './format-visual-dot';

describe('formatVisualDot', () => {
    it('should replace dot to numeric comma', () => {
        expect(formatVisualDot('500.6')).toBe('500,6');
    });

    it('should return value as is if there is no dots', () => {
        expect(formatVisualDot('500')).toBe('500');
    });
});
