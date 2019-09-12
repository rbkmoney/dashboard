import { icons } from './icons';
import { Content } from '../../../document';

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
        .reduce((prev, item, idx) => {
            prev.push(createCheckbox(item, active === idx), '    ');
            return prev;
        }, [])
        .slice(0, -1);
    return {
        text: title ? [`${title}:    `, ...text] : text
    };
}

export function createVerticalCheckboxWithTitle<T extends number>(
    title: string,
    itemsSrc: Items<T>,
    activeSrc?: T
): Content {
    const { items, active } = toItemsWithActive(itemsSrc, activeSrc);
    const body = items.map(
        title
            ? (item, idx) => [idx === 0 ? title : '', createCheckbox(item, active === idx)]
            : (item, idx) => [createCheckbox(item, active === idx)]
    );
    return {
        layout: 'noBorders',
        table: {
            widths: ['auto', '*'],
            body
        }
    };
}

export const createInlineCheckbox = <T extends number>(items: Items<T>, active?: T) =>
    createInlineCheckboxWithTitle(undefined, items, active);

export const createVerticalCheckbox = <T extends number>(items: Items<T>, active?: T) =>
    createVerticalCheckboxWithTitle(undefined, items, active);
