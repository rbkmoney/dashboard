import moment from 'moment';
import {
    Margins,
    TableLayoutFunctions,
    TDocumentDefinitions,
    PageSize,
    TDocumentHeaderFooterFunction
} from 'pdfmake/build/pdfmake';

import { cmToIn } from './cm-to-in';
import { createStyles, createDefaultStyle } from './create-styles';
import { createTableLayouts } from './create-table-layouts';
import { paragraph } from './content';
import { Data } from './data';

function createFooter({ margin, text }: { margin: Margins; text: string }): TDocumentHeaderFooterFunction {
    return () => ({
        margin,
        columns: [
            [
                {
                    canvas: [{ type: 'line', x1: 0, y1: -5, x2: 100, y2: -5, lineWidth: 0.5 }]
                },
                {
                    style: { fontSize: 6 },
                    text
                }
            ]
        ]
    });
}

export function createQuestionary(data: Data): [TDocumentDefinitions, { [name: string]: TableLayoutFunctions }] {
    const pageMargins = [3, 2, 1.5, 2].map(cm => cmToIn(cm)) as Margins;
    const footerMargins = [pageMargins[0], -cmToIn(1.4), pageMargins[2], 0] as Margins;
    return [
        {
            pageSize: 'A4' as PageSize,
            pageMargins,
            content: [
                {
                    text: data.header,
                    style: { alignment: 'right' }
                },
                {
                    text: data.headline,
                    style: {
                        alignment: 'center',
                        bold: true
                    },
                    margin: [0, 2, 0, 2] as Margins
                },
                ...data.paragraphs.map(({ title, content }) => paragraph(title, content)),
                {
                    layout: 'noBorders',
                    margin: [0, 30, 0, 0] as Margins,
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [
                                'М.П.' as any,
                                {
                                    text: moment().format('LL') + '\n\n\n_____________________/______________/',
                                    style: { alignment: 'right' }
                                }
                            ]
                        ]
                    }
                }
            ],
            footer: createFooter({ margin: footerMargins, text: data.footer }),
            styles: createStyles(),
            defaultStyle: createDefaultStyle()
        },
        createTableLayouts()
    ];
}
