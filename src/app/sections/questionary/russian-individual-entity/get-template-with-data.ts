import { Data } from '../create-questionary';
import { getData } from './get-data';
import { verticalCheckboxWithTitle, inlineCheckboxWithTitle, inlineCheckbox } from '../create-questionary/content';
import { YesNo, AccountingType, MonthOperationCount, MonthOperationSum, DocumentType } from '../select-data';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
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
                            [
                                [MonthOperationCount.LtTen, 'до 10'],
                                [MonthOperationCount.BtwTenToFifty, '10 - 50'],
                                [MonthOperationCount.GtFifty, 'свыше 50']
                            ],
                            data.monthOperation.monthOperationCount
                        ),
                        verticalCheckboxWithTitle(
                            '4.2. Сумма операций:',
                            [
                                [MonthOperationSum.LtFiveHundredThousand, 'до 500 000'],
                                [MonthOperationSum.BtwFiveHundredThousandToOneMillion, '500 000 - 1 000 000'],
                                [MonthOperationSum.GtOneMillion, 'свыше 1 000 000']
                            ],
                            data.monthOperation.monthOperationSum
                        )
                    ]
                ]
            },
            {
                title: '5. Адрес фактического осуществления (ведения) деятельности',
                content: [
                    [
                        `5.1. Страна: ${data.address.country}`,
                        { text: `5.2. Область/Регион: ${data.address.region}`, colSpan: 2 }
                    ],
                    [
                        `5.3. Город: ${data.address.city}`,
                        `5.4. Улица: ${data.address.street}`,
                        `5.5. Дом: ${data.address.number}`
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
                    [
                        inlineCheckbox(
                            [
                                [DocumentType.LeaseContract, 'Договор аренды'],
                                [DocumentType.SubleaseContract, 'Договор субаренды'],
                                [DocumentType.CertificateOfOwnership, 'Свидетельство о праве собственности']
                            ],
                            data.documentType
                        )
                    ]
                ]
            },
            {
                title: '7. Сведения о хозяйственной деятельности',
                content: [
                    [
                        inlineCheckboxWithTitle(
                            '7.1. Наличие в штате главного бухгалтера',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.business.hasChiefAccountant
                        ),
                        `7.2. Штатная численность в организации: ${data.business.staffCount}`
                    ],
                    [
                        {
                            ...verticalCheckboxWithTitle(
                                '7.3. Бухгалтерский учет осуществляет:',
                                [
                                    [AccountingType.HeadAccounting, 'ИП лично'],
                                    [
                                        AccountingType.AccountingOrganization,
                                        `Организация ведущая бух. учет: ИНН: ${data.business.accountingOrgInn}`
                                    ],
                                    [AccountingType.IndividualAccountant, 'Бухгалтер – индивидуальный специалист']
                                ],
                                data.business.accounting
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
                            ...inlineCheckboxWithTitle(
                                '8.1. Принадлежность к категории ПДЛ¹:',
                                [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                                data.pdl.foreignPublicPerson
                            ),
                            colSpan: 2
                        }
                    ],
                    [
                        inlineCheckboxWithTitle(
                            '8.2. Является родственником ПДЛ:',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.foreignRelativePerson
                        ),
                        `8.3. Степень родства: ${data.pdl.relationDegree}`
                    ]
                ]
            },
            {
                title: '9. Наличие выгодоприобретателя²',
                content: [
                    [
                        inlineCheckbox(
                            [
                                [YesNo.no, 'Нет'],
                                [YesNo.yes, 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)']
                            ],
                            data.benefitThirdParties
                        )
                    ]
                ]
            },
            {
                title: '10. Наличие бенефициарного владельца³',
                content: [
                    [
                        inlineCheckbox(
                            [
                                [YesNo.no, 'Нет'],
                                [
                                    YesNo.yes,
                                    'Да (обязательное заполнение приложение для Бенефициарного владельца по форме НКО)'
                                ]
                            ],
                            data.hasBeneficialOwner
                        )
                    ]
                ]
            },
            {
                title: '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                content: [[inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.hasRelation)]]
            },
            {
                title: '12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства',
                content: [[inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.taxResident)]]
            }
        ],
        footer:
            '¹ Публичные должностные лица, включая российские, иностранные и международные.' +
            '\n² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.' +
            '\n³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
    };
}
