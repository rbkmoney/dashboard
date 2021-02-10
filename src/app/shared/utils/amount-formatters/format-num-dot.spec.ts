import { formatNumDot } from './format-num-dot';

describe('formatNumDot', () => {
    it('should replace comma to numeric dot', () => {
        expect(formatNumDot('500,6')).toBe('500.6');
    });

    it('should return value as is if there is no commas', () => {
        expect(formatNumDot('500')).toBe('500');
    });
});
