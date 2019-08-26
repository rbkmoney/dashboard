import { Injectable } from '@angular/core';
import { Content, TDocumentHeaderFooterFunction, TableCell } from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { switchMap } from 'rxjs/operators';

import { DocumentService, Family } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../questionary';
import { IndividualEntityContractor, RussianIndividualEntity } from '../../api/questionary';

type FullContent = Content | Content[] | string | string[];

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('111');

    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    createIndividualEntityDoc() {
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

        const checkSquare: Content = {
            text: '',
            style: 'icon'
        };

        const square: Content = {
            text: '',
            style: 'icon'
        };

        function checkbox(text: string, checked = false): TableCell {
            return { text: [checked ? checkSquare : square, ' ', text] as any };
        }

        function underlined(text: string | number) {
            return {
                text,
                style: ['signature']
            };
        }

        function inlineCheckbox(...items: (string | [string, boolean])[]) {
            return {
                text: items
                    .reduce((prev, item) => {
                        prev.push(Array.isArray(item) ? checkbox(item[0], item[1]) : checkbox(item), '     ');
                        return prev;
                    }, [])
                    .slice(0, -1)
            };
        }

        return this.questionary$.pipe(
            switchMap(({ questionary }) => {
                const contactInfo = questionary.data.contactInfo;
                const contractor: IndividualEntityContractor = questionary.data.contractor;
                const individualEntity: RussianIndividualEntity = contractor.individualEntity;
                return this.createDoc(
                    [
                        {
                            layout: 'noBorders',
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [
                                        '' as any,
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
                            margin: [0, 2, 0, 2] as [number, number, number, number]
                        },
                        paragraph('1. Основные сведения о Клиенте', [
                            [
                                `1.1. Наименование: ИП ${individualEntity.russianPrivateEntity.personAnthroponym.secondName} ${individualEntity.russianPrivateEntity.personAnthroponym.firstName} ${individualEntity.russianPrivateEntity.personAnthroponym.middleName}`,
                                `1.2. ИНН: ${individualEntity.inn}`
                            ],
                            ['1.3. Фирменное наименование: ', '1.4. СНИЛС №: ']
                        ]),
                        paragraph('2. Контактная информация', [
                            [
                                `2.1. Телефон: ${contactInfo.phoneNumber}`,
                                '2.2. Сайт (Url):',
                                `2.3. Email: ${contactInfo.email}`
                            ]
                        ]),
                        paragraph(
                            '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                            [['3.1. Цели установления отношений:', '3.2. Характер отношений:']]
                        ),
                        paragraph('4. Планируемые операции по счету, в месяц', [
                            [
                                '4.1. Количество операций:',
                                [checkbox('до 10'), checkbox('10 - 50'), checkbox('свыше 50', true)],
                                '4.2. Сумма операций: ',
                                [
                                    checkbox('до 500 000'),
                                    checkbox('500 000 - 1 000 000'),
                                    checkbox('свыше 1 000 000', true)
                                ]
                            ]
                        ]),
                        paragraph('5. Адрес фактического осуществления (ведения) деятельности', [
                            ['5.1. Страна:', '5.2. Область/Регион:', ''],
                            ['5.3. Город:', '5.4. Улица:', '5.5. Дом:'],
                            ['5.6. Корпус/Строение:', '5.7. Офис/Помещение:', '5.8. Площадь (кв.м.):']
                        ]),
                        paragraph('6. Тип документа, подтверждающий право нахождения по фактическому адресу', [
                            [
                                checkbox('Договор аренды'),
                                checkbox('Договор субаренды'),
                                checkbox('Свидетельство о праве собственности')
                            ]
                        ]),
                        paragraph('7. Сведения о хозяйственной деятельности', [
                            ['7.1. Наличие в штате главного бухгалтера:', '7.2. Штатная численность в организации:'],
                            ['7.3. Бухгалтерский учет осуществляет:', '']
                        ]),
                        paragraph('8. Принадлежность физического лица к некоторым категория граждан', [
                            ['8.1. Принадлежность к категории ПДЛ¹', ''],
                            ['8.2. Является родственником ПДЛ', '8.3. Степень родства:']
                        ]),
                        paragraph('9. Наличие выгодоприобретателя²', [
                            [
                                inlineCheckbox(
                                    'Нет',
                                    'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'
                                )
                            ]
                        ]),
                        paragraph('10. Наличие бенефициарного владельца³', [
                            [
                                [
                                    inlineCheckbox(
                                        'Нет',
                                        'Да (обязательное заполнение приложение для Бенефициарного владельца по форме НКО)'
                                    )
                                ]
                            ]
                        ]),
                        paragraph(
                            '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                            [[inlineCheckbox('Да', 'Нет')]]
                        ),
                        paragraph('12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства', [
                            [inlineCheckbox('Да', 'Нет')]
                        ]),
                        {
                            layout: 'noBorders',
                            margin: [0, 30, 0, 0] as [number, number, number, number],
                            table: {
                                widths: ['*', 'auto'],
                                body: [
                                    [
                                        'М.П.' as any,
                                        {
                                            text: [
                                                moment().format('LL'),
                                                '\n\n\n_____________________/______________/'
                                            ],
                                            style: 'right'
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
                                    text: `¹ Публичные должностные лица, включая российские, иностранные и международные.
² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.
³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.`
                                }
                            ]
                        ],
                        margin: [40, -40, 40, 0]
                    })
                );
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
                    },
                    icon: {
                        font: Family.fa
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
