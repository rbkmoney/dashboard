import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

export class Font {
    base64: string;

    get hash() {
        return `${this.family}_${this.type.toString()}_(${this.url.replace(/\//g, '_').replace(/ /g, '+')})`;
    }

    constructor(public family: string, public type: keyof TFontFamilyTypes, public url: string) {}
}

export type FontFamily = Partial<Record<keyof TFontFamilyTypes, Font>>;

export function getHashMap(fonts: FontFamily) {
    return Object.entries(fonts).reduce((fontHashMap, [type, font]) => {
        fontHashMap[type] = font.hash;
        return fontHashMap;
    }, {});
}

export function createFontFamily(
    family: string,
    urlMap: Partial<Record<keyof TFontFamilyTypes, string>> = {}
): FontFamily {
    return Object.entries(urlMap).reduce(
        (fontFamily, [type, url]: [keyof TFontFamilyTypes, string]) => {
            fontFamily[type] = new Font(family, type, url);
        },
        {} as any
    );
}
