import { FontFamily, createFontFamily } from './font';

describe('Font', () => {
    let family: FontFamily;

    beforeEach(() => {
        family = createFontFamily('test', { normal: 'a/b/c d.ttf' });
    });

    afterEach(() => {});

    it('font hash', () => {
        expect(family.normal.hash).toBe('test_normal_(a_b_c+d.ttf)');
    });
});
