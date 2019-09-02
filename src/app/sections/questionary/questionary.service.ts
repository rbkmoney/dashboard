import { Injectable } from '@angular/core';
import { Content, TableCell, TableLayoutFunctions, Style } from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { switchMap } from 'rxjs/operators';

import { DocumentService, FontFamily } from '../../document';
import { QuestionaryService as QuestionaryApiService } from '../../questionary';
import { IndividualEntityContractor, RussianIndividualEntity } from '../../api/questionary';

type FullContent = Content | Content[] | string | string[];

@Injectable()
export class QuestionaryService {
    questionary$ = this.questionaryService.getQuestionary('111');

    constructor(private questionaryService: QuestionaryApiService, private documentService: DocumentService) {}

    createIndividualEntityDoc() {
        return this.questionary$.pipe(
            switchMap(({ questionary }) => {
                const contactInfo = questionary.data.contactInfo;
                const contractor: IndividualEntityContractor = questionary.data.contractor;
                const individualEntity: RussianIndividualEntity = contractor.individualEntity;
                return this.createDoc(({ form: { inlineCheckbox, verticalCheckbox } }) => ({
                    header: 'Приложение №',
                    headline:
                        'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ',
                    paragraphs: [
                        {
                            title: '1. Основные сведения о Клиенте',
                            content: [
                                [
                                    `1.1. Наименование: ИП ${individualEntity.russianPrivateEntity.personAnthroponym.secondName} ${individualEntity.russianPrivateEntity.personAnthroponym.firstName} ${individualEntity.russianPrivateEntity.personAnthroponym.middleName}`,
                                    `1.2. ИНН: ${individualEntity.inn}`
                                ],
                                ['1.3. Фирменное наименование: ', '1.4. СНИЛС №: ']
                            ]
                        },
                        {
                            title: '2. Контактная информация',
                            content: [
                                [
                                    `2.1. Телефон: ${contactInfo.phoneNumber}`,
                                    '2.2. Сайт (Url):',
                                    `2.3. Email: ${contactInfo.email}`
                                ]
                            ]
                        },
                        {
                            title:
                                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                            content: [['3.1. Цели установления отношений:', '3.2. Характер отношений:']]
                        },
                        {
                            title: '4. Планируемые операции по счету, в месяц',
                            content: [
                                [
                                    verticalCheckbox('4.1. Количество операций:', ['до 10', '10 - 50', 'свыше 50']),
                                    verticalCheckbox('4.2. Сумма операций:', [
                                        'до 500 000',
                                        '500 000 - 1 000 000',
                                        'свыше 1 000 000'
                                    ])
                                ]
                            ]
                        },
                        {
                            title: '5. Адрес фактического осуществления (ведения) деятельности',
                            content: [
                                ['5.1. Страна:', '5.2. Область/Регион:', ''],
                                ['5.3. Город:', '5.4. Улица:', '5.5. Дом:'],
                                ['5.6. Корпус/Строение:', '5.7. Офис/Помещение:', '5.8. Площадь (кв.м.):']
                            ]
                        },
                        {
                            title: '6. Тип документа, подтверждающий право нахождения по фактическому адресу',
                            content: [
                                [
                                    inlineCheckbox([
                                        'Договор аренды',
                                        'Договор субаренды',
                                        'Свидетельство о праве собственности'
                                    ])
                                ]
                            ]
                        },
                        {
                            title: '7. Сведения о хозяйственной деятельности',
                            content: [
                                [
                                    {
                                        text: [
                                            '7.1. Наличие в штате главного бухгалтера: ',
                                            inlineCheckbox(['Да', 'Нет'])
                                        ]
                                    },
                                    '7.2. Штатная численность в организации:'
                                ],
                                [
                                    {
                                        ...verticalCheckbox(
                                            '7.3. Бухгалтерский учет осуществляет:',
                                            [
                                                'ИП лично',
                                                'Организация ведущая бух. учет: ИНН: ',
                                                'Бухгалтер – индивидуальный специалист'
                                            ],
                                            2
                                        ),
                                        colSpan: 2
                                    }
                                ]
                            ]
                        },
                        {
                            title: '8. Принадлежность физического лица к некоторым категория граждан',
                            content: [
                                [
                                    {
                                        text: [
                                            '8.1. Принадлежность к категории ПДЛ¹:   ',
                                            inlineCheckbox(['Да', 'Нет'])
                                        ],
                                        colSpan: 2
                                    }
                                ],
                                [
                                    {
                                        text: ['8.2. Является родственником ПДЛ:   ', inlineCheckbox(['Да', 'Нет'])]
                                    },
                                    '8.3. Степень родства:'
                                ]
                            ]
                        },
                        {
                            title: '9. Наличие выгодоприобретателя²',
                            content: [
                                [
                                    inlineCheckbox([
                                        'Нет',
                                        'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'
                                    ])
                                ]
                            ]
                        },
                        {
                            title: '10. Наличие бенефициарного владельца³',
                            content: [
                                [
                                    [
                                        inlineCheckbox([
                                            'Нет',
                                            'Да (обязательное заполнение приложение для Бенефициарного владельца по форме НКО)'
                                        ])
                                    ]
                                ]
                            ]
                        },
                        {
                            title:
                                '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                            content: [[inlineCheckbox(['Да', 'Нет'])]]
                        },
                        {
                            title: '12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства',
                            content: [[inlineCheckbox(['Да', 'Нет'])]]
                        }
                    ],
                    footer: `¹ Публичные должностные лица, включая российские, иностранные и международные.
² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.
³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.`
                }));
            })
        );
    }

    createDoc(
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
    ) {
        const icons = this.getIcons({
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

        const cm = 30;
        const pageMargins: [number, number, number, number] = [3 * cm, 2 * cm, 1.5 * cm, 2 * cm];

        const data = getData({ form: { verticalCheckbox, inlineCheckbox } });

        return this.documentService.createPdf(
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
                        margin: [0, 2, 0, 2] as [number, number, number, number]
                    },
                    ...data.paragraphs.map(p => paragraph(p.title, p.content)),
                    {
                        layout: 'noBorders',
                        margin: [0, 30, 0, 0] as [number, number, number, number],
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
                    margin: [pageMargins[0], -40, pageMargins[2], 0],
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
                styles: this.getStyles(),
                defaultStyle: this.getDefaultStyle()
            },
            this.getTableLayouts()
        );
    }

    getTableLayouts(): { [name: string]: TableLayoutFunctions } {
        return {
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
        };
    }

    getStyles(): { [name: string]: Style } {
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

    getDefaultStyle(): Style {
        return {
            font: FontFamily.serif,
            fontSize: 8,
            lineHeight: 1
        };
    }

    getIcons<T extends { [name: string]: string }>(icons: T): Record<keyof T, Content> {
        return Object.entries(icons).reduce(
            (acc, [name, text]) => {
                acc[name] = { text, style: 'icon' };
                return acc;
            },
            {} as any
        );
    }
}
