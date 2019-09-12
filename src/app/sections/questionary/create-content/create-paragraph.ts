import { Content, Table } from '../../../document';
import { Layout } from '../create-questionary';
import { createTableBody } from './create-table-body';

function getColumnsCount(row: Table['body'][number]): number {
    return row.reduce((accCount, col) => accCount + (typeof col === 'object' && col.colSpan ? col.colSpan : 1), 0);
}

export function createVerticalParagraph(header: string, body: Table['body'] = [[]]): Content {
    const columnsCount = getColumnsCount(body[0]);
    const headerRow: Table['body'][number] = [
        {
            colSpan: columnsCount,
            style: { color: 'white' },
            text: header
        }
    ];
    return {
        layout: Layout.header,
        table: {
            widths: new Array(columnsCount).fill('*'),
            headerRows: 1,
            body: createTableBody([headerRow, ...body])
        }
    };
}

export function createInlineParagraph(header: string, body: Table['body'] = [[]]): Content {
    const headerRow: Table['body'][number] = [
        {
            rowSpan: body.length,
            style: { color: 'white' },
            text: header
        }
    ];
    return {
        layout: Layout.header,
        table: {
            widths: ['*', '*'],
            headerRows: 1,
            body: body.map((row, idx) => (idx === 0 ? [headerRow, ...row] : [null, ...row]))
        }
    };
}
