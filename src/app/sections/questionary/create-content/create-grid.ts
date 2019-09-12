import { Layout } from '../create-questionary';
import { Content, Table } from '../../../document';
import { createTableBody } from './create-table-body';
import { getColumnsCount } from './get-columns-count';

type Item = Table['body'][number][number] | [Table['body'][number][number], number];

export function createGrid(items: Item[]): Content {
    const row = items.map(i => {
        if (Array.isArray(i)) {
            const [item, colSpan] = i;
            return typeof item === 'object' ? { ...item, colSpan } : { colSpan, text: item };
        } else {
            return i;
        }
    });
    return {
        layout: Layout.wrapper,
        table: {
            widths: new Array(getColumnsCount(row)).fill('*'),
            body: createTableBody([row])
        }
    };
}
