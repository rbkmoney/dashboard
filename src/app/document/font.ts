import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

export class Font<T extends string = string> {
    base64: string;

    get hash() {
        return `${this.family}_${this.type.toString()}_(${this.url.replace(/\//g, '_').replace(/ /g, '+')})`;
    }

    constructor(public family: T, public type: keyof TFontFamilyTypes, public url: string) {}
}

export type FontFamily<T extends string = string> = Partial<Record<keyof TFontFamilyTypes, Font<T>>>;

export function getHashMap<T extends string>(fonts: FontFamily<T>) {
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
