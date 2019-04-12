import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

export class FontFamily {
    get hashMap() {
        return Object.keys(this.fonts).reduce((f, type) => {
            f[type] = (this.fonts[type] as Font).hash;
            return f;
        }, {});
    }

    fonts: Partial<Record<keyof TFontFamilyTypes, Font>> = {};

    constructor(public name: string, urlMap: Partial<Record<keyof TFontFamilyTypes, string>>) {
        const fontsTypes: Array<keyof TFontFamilyTypes> = Object.keys(urlMap) as Array<keyof TFontFamilyTypes>;
        for (let i = 0; i < fontsTypes.length; ++i) {
            const type = fontsTypes[i];
            this.fonts[type] = new Font(this, type, urlMap[type]);
        }
    }
}

export class Font {
    base64: string;

    get hash() {
        return `${this.family.name}_${this.type}_(${this.url.replace(/\//g, '_').replace(/ /g, '+')})`;
    }

    constructor(public family: FontFamily, public type: keyof TFontFamilyTypes, public url: string) {}
}
