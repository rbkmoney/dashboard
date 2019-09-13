import { icons } from './icons';
import { Content } from '../../../document';
import { Layout } from '../create-questionary';
import { createGrid } from './create-grid';

type Items<T extends number | string> = string[] | [T, string][];

export function createCheckbox(text: string, active = false): Content {
    return { text: [active ? icons.checkSquare : icons.square, ' ', text] };
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

export function createInlineCheckboxWithTitle<T extends number>(
    title: string,
    itemsSrc: Items<T>,
    activeSrc?: T
): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    const text = items
        .reduce((prev, item, idx) => [...prev, createCheckbox(item, active === idx), '    '], [])
        .slice(0, -1);
    return { text: [`${title}:    `, ...text] };
}

export function createInlineCheckbox<T extends number>(itemsSrc: Items<T>, activeSrc?: T): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    const text = items
        .reduce((prev, item, idx) => [...prev, createCheckbox(item, active === idx), '    '], [])
        .slice(0, -1);
    return { text };
}

export function createHorizontalCheckbox<T extends number>(itemsSrc: Items<T>, activeSrc?: T): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    return createGrid(items.map((item, idx) => createCheckbox(item, active === idx)), 0.25);
}

export function createVerticalCheckboxWithTitle<T extends number>(
    title: string,
    itemsSrc: Items<T>,
    activeSrc?: T
): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    return {
        layout: Layout.noBorders,
        table: {
            widths: ['auto', '*'],
            body: items.map((item, idx) => [idx === 0 ? title : null, createCheckbox(item, active === idx)])
        }
    };
}

export function createVerticalCheckbox<T extends number>(itemsSrc: Items<T>, activeSrc?: T): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    return {
        layout: Layout.noBorders,
        table: {
            widths: ['auto', '*'],
            body: items.map((item, idx) => [createCheckbox(item, active === idx)])
        }
    };
}
