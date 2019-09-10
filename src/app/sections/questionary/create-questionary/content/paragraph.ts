import { TableCell, Content, Table } from 'pdfmake/build/pdfmake';

export function paragraph(header: string, body: (TableCell | Content | string)[][] = [[]]): Content {
    const columnsCount = body[0].reduce((accCount, col: TableCell) => accCount + (col ? col.colSpan : 1), 0);
    const renderedBody = [
        [
            {
                colSpan: columnsCount,
                style: {
                    color: 'white'
                },
                text: header
            } as TableCell
        ],
        ...(body as Table['body'])
    ];
    /**
     * Магия ✨ таблиц PDFMake (TODO: исправить если что-то изменится)
     * В таблице первая колонка с `colSpan` свойством должна иметь после себя `colSpan - 1` пустых колонок
     * похоже она использует их для расширения первой колонки
     */
    for (let i = 0; i < renderedBody.length; ++i) {
        const row = renderedBody[i];
        const [firstColumn, ...otherColumns] = row;
        if (firstColumn && firstColumn.colSpan && firstColumn.colSpan > 1) {
            renderedBody[i] = [firstColumn, ...new Array(firstColumn.colSpan - 1).fill(null), ...otherColumns];
        }
    }
    return {
        layout: 'header',
        table: {
            widths: new Array(columnsCount).fill('*'),
            headerRows: 1,
            body: renderedBody
        }
    };
}
