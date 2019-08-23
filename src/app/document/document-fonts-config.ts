import { createFontFamily } from './font/font-family';

export enum Family {
    serif = 'serif',
    fa = 'fa'
}

const robotoDir = '/assets/fonts/Roboto/';
const faDir = '/assets/fonts/font-awesome5/';

export const fonts = [
    createFontFamily(Family.serif, {
        normal: `${robotoDir}Roboto-Regular.ttf`,
        bold: `${robotoDir}Roboto-Bold.ttf`,
        italics: `${robotoDir}Roboto-RegularItalic.ttf`,
        bolditalics: `${robotoDir}Roboto-BoldItalic.ttf`
    }),
    createFontFamily(Family.fa, {
        normal: `${faDir}fa-regular-400.ttf`
    })
];
