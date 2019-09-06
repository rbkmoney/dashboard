import { Data } from '../create-questionary';
import { getData } from './get-data';
import { verticalCheckboxWithTitle, inlineCheckboxWithTitle, inlineCheckbox } from '../create-questionary/content';
import { MonthOperationCount, MonthOperationSum } from '../../../api-codegen/questionary';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
    const monthOperationCount = [
        MonthOperationCount.LtTen,
        MonthOperationCount.BtwTenToFifty,
        MonthOperationCount.GtFifty
    ].findIndex(count => count === data.monthOperation.monthOperationCount);
    const monthOperationSum = [
        MonthOperationSum.LtFiveHundredThousand,
        MonthOperationSum.BtwFiveHundredThousandToOneMillion,
        MonthOperationSum.GtOneMillion
    ].findIndex(sum => sum === data.monthOperation.monthOperationSum);
    return {
        header: 'Приложение №',
        headline:
            'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ',
        paragraphs: [
            {
                title: '1. Основные сведения о Клиенте',
                content: [
                    [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                    [`1.3. Фирменное наименование: ${data.basic.brandName}`, `1.4. СНИЛС №: ${data.basic.snils}`]
                ]
            },
            {
                title: '2. Контактная информация',
                content: [
                    [
                        `2.1. Телефон: ${data.contact.phone}`,
                        `2.2. Сайт (Url): ${data.contact.url}`,
                        `2.3. Email: ${data.contact.email}`
                    ]
                ]
            },
            {
                title: '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                content: [
                    [
                        `3.1. Цели установления отношений: ${data.relationshipsWithNko.nkoRelationTarget}`,
                        `3.2. Характер отношений: ${data.relationshipsWithNko.relationshipWithNko}`
                    ]
                ]
            },
            {
                title: '4. Планируемые операции по счету, в месяц',
                content: [
                    [
                        verticalCheckboxWithTitle(
                            '4.1. Количество операций:',
                            ['до 10', '10 - 50', 'свыше 50'],
                            monthOperationCount
                        ),
                        verticalCheckboxWithTitle(
                            '4.2. Сумма операций:',
                            ['до 500 000', '500 000 - 1 000 000', 'свыше 1 000 000'],
                            monthOperationSum
                        )
                    ]
                ]
            },
            {
                title: '5. Адрес фактического осуществления (ведения) деятельности',
                content: [
                    [`5.1. Страна: ${data.address.country}`, `5.2. Область/Регион: ${data.address.region}`, ''],
                    [
                        `5.3. Город: ${data.address.city}`,
                        `5.4. Улица: ${data.address.street}`,
                        `5.5. Дом: ${data.address.house}`
                    ],
                    [
                        `5.6. Корпус/Строение: ${data.address.building}`,
                        `5.7. Офис/Помещение: ${data.address.office}`,
                        `5.8. Площадь (кв.м.): ${data.address.area}`
                    ]
                ]
            },
            {
                title: '6. Тип документа, подтверждающий право нахождения по фактическому адресу',
                content: [
                    [inlineCheckbox(['Договор аренды', 'Договор субаренды', 'Свидетельство о праве собственности'])]
                ]
            },
            {
                title: '7. Сведения о хозяйственной деятельности',
                content: [
                    [
                        inlineCheckboxWithTitle('7.1. Наличие в штате главного бухгалтера', ['Да', 'Нет']),
                        '7.2. Штатная численность в организации:'
                    ],
                    [
                        {
                            ...verticalCheckboxWithTitle(
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
                            text: ['8.1. Принадлежность к категории ПДЛ¹:   ', inlineCheckbox(['Да', 'Нет'])],
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
                    [inlineCheckbox(['Нет', 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'])]
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
                title: '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
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
    };
}
