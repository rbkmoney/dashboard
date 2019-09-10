import { TableCell, Content } from 'pdfmake/build/pdfmake';

export function paragraph(
    header: string,
    body: (TableCell | Content | Content[] | string | string[])[][] = [[]]
): Content {
    let count = 0;
    for (const i of body[0]) {
        count += i ? (i as TableCell).colSpan || 1 : 1;
    }
    const renderedBody = [
        [
            {
                colSpan: count,
                style: {
                    color: 'white'
                },
                text: header
            } as TableCell
        ],
        ...(body as (TableCell[][] | Content[][]))
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
            widths: new Array(count).fill('*'),
            headerRows: 1,
            body: renderedBody
        }
    };
}
