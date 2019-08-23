import { Injectable } from '@angular/core';
import { Content, TDocumentHeaderFooterFunction, TableCell } from 'pdfmake/build/pdfmake';

import { DocumentService, Family } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../questionary';

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('111');

    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    createIndividualEntityDoc() {
        function paragraph(header: string, body: Content[][] | TableCell[][] | string[][]): Content {
            const count = body[0].length;
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

        const checkSquare: Content = {
            text: '',
            style: {
                font: Family.fa
            }
        };

        const square: Content = {
            text: '',
            style: {
                font: Family.fa
            }
        };

        return this.createDoc(
            [
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', '*'],
                        body: [
                            [
                                '',
                                {
                                    text: 'Приложение №',
                                    style: 'right'
                                }
                            ]
                        ]
                    }
                },
                {
                    text:
                        'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ',
                    style: 'header',
                    margin: [0, 2, 0, 2]
                },
                paragraph('1. Основные сведения о Клиенте', [
                    ['1.1. Наименование: ', '1.2. ИНН:  '],
                    ['1.3. Фирменное наименование: ', '1.4. СНИЛС №: ']
                ]),
                paragraph('2. Контактная информация', [['2.1. Телефон: ', '2.2. Сайт (Url):   ', '2.3. Email:']]),
                paragraph('3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО ', [
                    ['3.1. Цели установления отношений: ', '3.2. Характер отношений:']
                ]),
                paragraph('4. Планируемые операции по счету, в месяц', [
                    [
                        '4.1. Количество операций:',
                        [{ text: [checkSquare, ' test'] }, { text: [checkSquare, ' test'] }],
                        '4.2. Сумма операций: '
                    ]
                ]),
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [
                                'М.П.',
                                {
                                    text: [
                                        '«',
                                        {
                                            text: `2019`,
                                            style: ['signature']
                                        },
                                        '»'
                                    ]
                                }
                            ]
                        ]
                    }
                }
            ],
            () => ({
                columns: [
                    [
                        {
                            canvas: [{ type: 'line', x1: 0, y1: -5, x2: 100, y2: -5, lineWidth: 0.5 }]
                        },
                        {
                            style: 'footer',
                            text: `Публичные должностные лица, включая российские, иностранные и международные.
Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.
Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.`
                        }
                    ]
                ],
                margin: [40, -40, 40, 0]
            })
        );
    }

    createDoc(content: Content[], footer?: TDocumentHeaderFooterFunction) {
        return this.documentService.createPdf(
            {
                pageSize: 'A4' as any,
                pageMargins: [40, 60, 40, 60],
                content,
                footer,
                styles: {
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
                    signature: {
                        decoration: 'underline',
                        decorationStyle: 'solid',
                        decorationColor: 'black'
                    }
                },
                defaultStyle: {
                    font: Family.serif,
                    fontSize: 8,
                    lineHeight: 1
                }
            },
            {
                header: {
                    fillColor(i, node) {
                        return i === 0 || i === node.table.body.length ? '#203764' : undefined;
                    },
                    hLineWidth() {
                        return 0;
                    },
                    vLineWidth() {
                        return 0;
                    }
                }
            }
        );
    }
}
