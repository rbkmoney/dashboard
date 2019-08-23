import { Component } from '@angular/core';

import { QuestionaryService } from './questionary.service';
import { DocumentService, Family } from '../../document';

@Component({
    selector: 'dsh-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss'],
    providers: [QuestionaryService]
})
export class QuestionaryComponent {
    questionary$ = this.questionaryService.questionary$;

    constructor(private questionaryService: QuestionaryService, private documentService: DocumentService) {
        this.questionary$.subscribe(x => {
            console.log(x);
        });
        this.downloadDocument();
    }

    downloadDocument() {
        this.documentService
            .createPdf(
                {
                    pageSize: 'A4' as any,
                    pageMargins: [40, 60, 40, 60],
                    content: [
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
                        {
                            layout: 'header',
                            table: {
                                widths: ['*', '*'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            colSpan: 2,
                                            text: '1. Основные сведения о Клиенте',
                                            style: 'tableHeader'
                                        },
                                        null
                                    ],
                                    ['1.1. Наименование: ', '1.2. ИНН:  '],
                                    ['1.3. Фирменное наименование: ', '1.4. СНИЛС №: ']
                                ]
                            }
                        },
                        {
                            layout: 'header',
                            table: {
                                widths: ['*', '*', '*'],
                                headerRows: 1,
                                body: [
                                    [
                                        {
                                            colSpan: 2,
                                            text: '2. Контактная информация',
                                            style: 'tableHeader'
                                        },
                                        null,
                                        null
                                    ],
                                    ['2.1. Телефон: ', '2.2. Сайт (Url):   ', '2.3. Email:']
                                ]
                            }
                        },
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
                    footer: () => ({
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
                    }),
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
            )
            .subscribe(doc => {
                doc.download();
            });
    }
}
