import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

export class Font<T extends string = string> {
    base64: string;

    get hash() {
        return `${this.family}_${this.type.toString()}_(${this.url.replace(/\//g, '_').replace(/ /g, '+')})`;
    }

    constructor(public family: T, public type: keyof TFontFamilyTypes, public url: string) {}
}
