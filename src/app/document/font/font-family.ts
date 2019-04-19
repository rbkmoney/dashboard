import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

import { Font } from './font';

export type FontFamily<T extends string = string> = Partial<Record<keyof TFontFamilyTypes, Font<T>>>;

export function getFontFamilyHashMap<T extends string>(fonts: FontFamily<T>) {
    return Object.entries(fonts).reduce((fontHashMap, [type, font]) => {
        fontHashMap[type] = font.hash;
        return fontHashMap;
    }, {});
}

export function createFontFamily<T extends string>(
    family: T,
    urlMap: Partial<Record<keyof TFontFamilyTypes, string>> = {}
): FontFamily<T> {
    return Object.entries(urlMap).reduce((fontFamily, [type, url]: [keyof TFontFamilyTypes, string]) => {
        fontFamily[type] = new Font(family, type, url);
        return fontFamily;
    }, {});
}
