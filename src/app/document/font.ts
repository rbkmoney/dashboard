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
    return Object.keys(fonts).reduce((f, type) => {
        f[type] = (fonts[type] as Font).hash;
        return f;
    }, {});
}

export function createFontFamily(
    family: string,
    urlMap: Partial<Record<keyof TFontFamilyTypes, string>> = {}
): FontFamily {
    const fonts: FontFamily = {};
    const fontsTypes = Object.keys(urlMap) as Array<keyof TFontFamilyTypes>;
    for (let i = 0; i < fontsTypes.length; ++i) {
        const type = fontsTypes[i];
        (fonts as any)[type] = new Font(family, type, (urlMap as any)[type]);
    }
    return fonts;
}
