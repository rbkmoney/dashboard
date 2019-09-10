import { Margins } from 'pdfmake/build/pdfmake';

import { cmToIn } from './cm-to-in';

export function cmMarginsToIn(
    ...marginsCm: [number] | [number, number] | [number, number, number, number] | number[]
): Margins {
    return marginsCm.slice(0, 4).map(cm => cmToIn(cm)) as Margins;
}
