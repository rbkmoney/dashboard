import { createFontFamily } from './font/font-family';

export enum Family {
    serif = 'serif'
}

export const fonts = [
    createFontFamily(Family.serif, {
        normal: '/assets/fonts/Tinos regular.ttf',
        bold: '/assets/fonts/Tinos 700.ttf',
        italics: '/assets/fonts/Tinos italic.ttf',
        bolditalics: '/assets/fonts/Tinos 700italic.ttf'
    })
];
