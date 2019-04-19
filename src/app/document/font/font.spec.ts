import { FontFamily, createFontFamily } from './font-family';

describe('Font', () => {
    let family: FontFamily;

    beforeEach(() => {
        family = createFontFamily('test', { normal: 'a/b/c d.ttf' });
    });

    it('hash', () => {
        expect(family.normal.hash).toBe('test_normal_(a_b_c+d.ttf)');
    });
});
