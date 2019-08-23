import { createFontFamily } from './font/font-family';

export enum Family {
    serif = 'serif'
}

const robotoDir = '/assets/fonts/Roboto/';

export const fonts = [
    createFontFamily(Family.serif, {
        normal: `${robotoDir}Roboto-Regular.ttf`,
        bold: `${robotoDir}Roboto-Bold.ttf`,
        italics: `${robotoDir}Roboto-RegularItalic.ttf`,
        bolditalics: `${robotoDir}Roboto-BoldItalic.ttf`
    })
];
