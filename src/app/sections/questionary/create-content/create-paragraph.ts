import { TableCell, Content } from '../../../document';
import { Layout } from '../create-questionary';
import { createTableBody } from './create-table-body';

export function createVerticalParagraph(header: string, body: TableCell[][] = [[]]): Content {
    const columnsCount = body[0].reduce(
        (accCount, col: TableCell) => accCount + (typeof col === 'object' && col.colSpan ? col.colSpan : 1),
        0
    );
    const headerRow: TableCell[] = [
        {
            colSpan: columnsCount,
            style: {
                color: 'white'
            },
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
