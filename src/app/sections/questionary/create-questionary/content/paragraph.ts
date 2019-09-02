import { TableCell, Content } from 'pdfmake/build/pdfmake';

export function paragraph(
    header: string,
    body: (TableCell | Content | Content[] | string | string[])[][] = [[]]
): Content {
    let count = 0;
    for (const i of body[0]) {
        count += (i as TableCell).colSpan || 1;
    }
    return {
        layout: 'header',
        table: {
            widths: new Array(count).fill('*'),
            headerRows: 1,
            body: [
                [
                    {
                        colSpan: count,
                        style: {
                            color: 'white'
                        },
                        text: header
                    },
                    ...new Array(count - 1).fill(null)
                ],
                ...body
            ]
        }
    };
}
