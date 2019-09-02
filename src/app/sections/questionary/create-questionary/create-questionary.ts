import moment from 'moment';
import { TableCell, Content, Margins, Style, TableLayoutFunctions, TDocumentDefinitions } from 'pdfmake/build/pdfmake';

import { FontFamily } from '../../../document';
import { cmToInc } from './cm-to-inc';

type FullContent = Content | Content[] | string | string[];

export function createQuestionary(
    getData: (lang: {
        form: {
            inlineCheckbox;
            verticalCheckbox;
        };
    }) => {
        header: string;
        headline: string;
        paragraphs: { title: string; content: (TableCell | FullContent)[][] }[];
        footer?: string;
    }
): [
    TDocumentDefinitions,
    {
        [name: string]: TableLayoutFunctions;
    }
] {
    const icons = getIcons({
        checkSquare: '',
        square: ''
    });

    function checkbox(text: string, checked = false): TableCell {
        return { text: [checked ? icons.checkSquare : icons.square, ' ', text] as any };
    }

    function inlineCheckbox(items: string[], checked: number = -1) {
        return {
            text: items
                .reduce((prev, item, idx) => {
                    prev.push(checkbox(item, checked === idx), '    ');
                    return prev;
                }, [])
                .slice(0, -1)
        };
    }

    function verticalCheckbox(title: string, items: string[], active: number = -1): Content {
        return {
            layout: 'noBorders',
            table: {
                widths: ['auto', '*'],
                body: items.map((item, idx) => [idx === 0 ? title : '', checkbox(item, active === idx)])
            }
        };
    }

    function paragraph(header: string, body: (TableCell | FullContent)[][] = [[]]): Content {
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
                            style: 'tableHeader',
                            text: header
                        },
                        ...new Array(count - 1).fill(null)
                    ],
                    ...body
                ]
            }
        };
    }

    const pageMargins = [3, 2, 1.5, 2].map(m => cmToInc(m)) as Margins;
    const footerMargins = [pageMargins[0], -40, pageMargins[2], 0];

    const data = getData({ form: { verticalCheckbox, inlineCheckbox } });

    return [
        {
            pageSize: 'A4' as any,
            pageMargins,
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', '*'],
                        body: [
                            [
                                '' as any,
                                {
                                    text: data.header,
                                    style: 'right'
                                }
                            ]
                        ]
                    }
                },
                {
                    text: data.headline,
                    style: 'header',
                    margin: [0, 2, 0, 2] as Margins
                },
                ...data.paragraphs.map(p => paragraph(p.title, p.content)),
                {
                    layout: 'noBorders',
                    margin: [0, 30, 0, 0] as Margins,
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [
                                'М.П.' as any,
                                {
                                    text: [moment().format('LL'), '\n\n\n_____________________/______________/'],
                                    style: 'right'
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
                            style: 'footer',
                            text: data.footer
                        }
                    ]
                ]
            }),
            styles: getStyles(),
            defaultStyle: getDefaultStyle()
        },
        getTableLayouts()
    ];
}

function getTableLayouts(): { [name: string]: TableLayoutFunctions } {
    return {
        header: {
            fillColor(idx) {
                return idx === 0 ? '#203764' : undefined;
            },
            hLineWidth() {
                return 0;
            },
            vLineWidth() {
                return 0;
            }
        }
    };
}

function getStyles(): { [name: string]: Style } {
    return {
        header: {
            alignment: 'center',
            bold: true
        },
        right: { alignment: 'right' },
        tableHeader: {
            color: 'white'
        },
        footer: {
            fontSize: 6
        },
        underline: {
            decoration: 'underline',
            decorationStyle: 'solid',
            decorationColor: 'black'
        },
        icon: {
            font: FontFamily.fa
        }
    };
}

function getDefaultStyle(): Style {
    return {
        font: FontFamily.serif,
        fontSize: 8,
        lineHeight: 1
    };
}

function getIcons<T extends { [name: string]: string }>(icons: T): Record<keyof T, Content> {
    return Object.entries(icons).reduce(
        (acc, [name, text]) => {
            acc[name] = { text, style: 'icon' };
            return acc;
        },
        {} as any
    );
}
