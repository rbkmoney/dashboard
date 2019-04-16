import { createFontFamily } from './font';

export enum Family {
    serif = 'serif'
}

export const FONTS = [
    createFontFamily(Family.serif, {
        normal: '/assets/fonts/Tinos regular.ttf',
        bold: '/assets/fonts/Tinos 700.ttf',
        italics: '/assets/fonts/Tinos italic.ttf',
        bolditalics: '/assets/fonts/Tinos 700italic.ttf'
    })
];
