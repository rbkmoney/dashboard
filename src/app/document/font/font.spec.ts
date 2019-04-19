import { Font } from './font';

describe('Font', () => {
    it('should return hash', () => {
        const font = new Font('test', 'normal', 'a/b/c d.ttf');
        expect(font.hash).toBe('test_normal_(a_b_c+d.ttf)');
    });
});
