import { Content, Table, TableCell, cmMarginsToIn } from '../../../document';
import { Layout } from '../create-questionary';
import { createTableBody } from './create-table-body';
import { PRIMARY_COLOR } from '../create-questionary/colors';

const MARGIN = cmMarginsToIn(0, 0.1);

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
        margin: MARGIN,
        table: {
            widths: new Array(columnsCount).fill('*'),
            body: createTableBody([headerRow, ...body])
        }
    };
}

export function createInlineParagraph(header: string, body: Table['body'] = [[]]): Content {
    const headerTable: Content = {
        layout: Layout.noBorders,
        table: {
            rowSpan: body.length,
            widths: ['*'],
            body: [
                [
                    {
                        text: header,
                        style: { color: 'white' },
                        fillColor: PRIMARY_COLOR
                    }
                ]
            ]
        }
    };
    const bodyTable = {
        layout: Layout.noBorders,
        table: {
            rowSpan: body.length,
            widths: ['*'],
            body
        }
    };
    return {
        layout: Layout.wrapper,
        margin: MARGIN,
        table: {
            widths: ['*', '*'],
            body: [[headerTable, bodyTable]]
        }
    };
}
