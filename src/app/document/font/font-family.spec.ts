import { FontFamily, createFontFamily } from './font-family';
import { Font } from './font';

describe('createFontFamily', () => {
    it('should return empty FontFamily', () => {
        const family: FontFamily = createFontFamily('test', {});
        expect(family).toEqual({});
    });

    it('should return FontFamily structure', () => {
        const family: FontFamily = createFontFamily('test', { normal: 'a/b/c d.ttf' });
        expect(family).toEqual({ normal: new Font('test', 'normal', 'a/b/c d.ttf') });
    });

    it('should return FontFamily with 2 style', () => {
        const family: FontFamily = createFontFamily('test', { normal: 'a/b/c d.ttf', bold: 'bold.ttf' });
        expect(family).toEqual({
            normal: new Font('test', 'normal', 'a/b/c d.ttf'),
            bold: new Font('test', 'bold', 'bold.ttf')
        });
    });
});
