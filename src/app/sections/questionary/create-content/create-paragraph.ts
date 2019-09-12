import { Content, Table, cmMarginsToIn } from '../../../document';
import { Layout } from '../create-questionary';
import { createTableBody } from './create-table-body';
import { PRIMARY_COLOR } from '../create-questionary';
import { getColumnsCount } from './get-columns-count';
import { createGrid } from './create-grid';

const MARGIN = cmMarginsToIn(0, 0.1);

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
    return { ...createGrid([headerTable, bodyTable]), margin: MARGIN };
}
