import { TableCell, Content } from 'pdfmake/build/pdfmake';

import { icons } from './icons';

export function checkbox(text: string, checked = false): TableCell {
    return { text: [checked ? icons.checkSquare : icons.square, ' ', text] as any };
}

export function inlineCheckbox(items: string[], checked: number = -1) {
    return {
        text: items
            .reduce((prev, item, idx) => {
                prev.push(checkbox(item, checked === idx), '    ');
                return prev;
            }, [])
            .slice(0, -1)
    };
}

export function verticalCheckbox(title: string, items: string[], active: number = -1): Content {
    return {
        layout: 'noBorders',
        table: {
            widths: ['auto', '*'],
            body: items.map((item, idx) => [idx === 0 ? title : '', checkbox(item, active === idx)] as any)
        }
    };
}
