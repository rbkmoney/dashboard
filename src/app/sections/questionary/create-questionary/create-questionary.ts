import moment from 'moment';
import { TableCell, Content, Margins, TableLayoutFunctions, TDocumentDefinitions } from 'pdfmake/build/pdfmake';

import { cmToInc } from './cm-to-inc';
import { createStyles, createDefaultStyle } from './create-styles';
import { createTableLayouts } from './create-table-layouts';
import { verticalCheckbox, inlineCheckbox, paragraph } from './content';

export function createQuestionary(
    getData: (lang: {
        form: {
            inlineCheckbox;
            verticalCheckbox;
        };
    }) => {
        header: string;
        headline: string;
        paragraphs: { title: string; content: (TableCell | Content | Content[] | string | string[])[][] }[];
        footer?: string;
    }
): [TDocumentDefinitions, { [name: string]: TableLayoutFunctions }] {
    const pageMargins = [3, 2, 1.5, 2].map(cmToInc) as Margins;
    const footerMargins = [pageMargins[0], -40, pageMargins[2], 0];
    const data = getData({ form: { verticalCheckbox, inlineCheckbox } });

    return [
        {
            pageSize: 'A4' as any,
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
            footer: () => ({
                margin: footerMargins,
                columns: [
                    [
                        {
                            canvas: [{ type: 'line', x1: 0, y1: -5, x2: 100, y2: -5, lineWidth: 0.5 }]
                        },
                        {
                            style: {
                                fontSize: 6
                            },
                            text: data.footer
                        }
                    ]
                ]
            }),
            styles: createStyles(),
            defaultStyle: createDefaultStyle()
        },
        createTableLayouts()
    ];
}
