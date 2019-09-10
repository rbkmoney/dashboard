import { TableCell, Content } from 'pdfmake/build/pdfmake';

import { icons } from './icons';

type Items<T extends number | string> = string[] | [T, string][];

export function checkbox(text: string, active = false): TableCell {
    return { text: [active ? icons.checkSquare : icons.square, ' ', text] as any };
}

function toItemsWithActive<T extends number>(items: Items<T>, active: T): { items: string[]; active: number } {
    return Array.isArray(items[0])
        ? {
              items: (items as [T, string][]).map(i => i[1]),
              active: active !== undefined && active !== null ? (items as [T, string][])[active][0] : null
          }
        : {
              items: items as string[],
              active
          };
}

export function inlineCheckboxWithTitle<T extends number>(title: string, itemsSrc: Items<T>, activeSrc?: T) {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    const text = items
        .reduce((prev, item, idx) => {
            prev.push(checkbox(item, active === idx), '    ');
            return prev;
        }, [])
        .slice(0, -1);
    return {
        text: title ? [`${title}:    `, ...text] : text
    };
}

export function verticalCheckboxWithTitle<T extends number>(title: string, itemsSrc: Items<T>, activeSrc?: T): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    const body = items.map(
        title
            ? (item, idx) => [idx === 0 ? title : '', checkbox(item, active === idx)] as any
            : (item, idx) => [checkbox(item, active === idx)] as any
    );
    return {
        layout: 'noBorders',
        table: {
            widths: ['auto', '*'],
            body
        }
    };
}

export const inlineCheckbox = <T extends number>(items: Items<T>, active?: T) =>
    inlineCheckboxWithTitle(undefined, items, active);

export const verticalCheckbox = <T extends number>(items: Items<T>, active?: T) =>
    verticalCheckboxWithTitle(undefined, items, active);
