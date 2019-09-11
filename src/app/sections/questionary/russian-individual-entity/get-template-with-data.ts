import { Data } from '../create-questionary';
import { getData } from './get-data';
import {
    verticalCheckboxWithTitle,
    inlineCheckboxWithTitle,
    inlineCheckbox,
    paragraph,
    header,
    headline
} from '../create-content';
import { YesNo, AccountingType, MonthOperationCount, MonthOperationSum, DocumentType } from '../select-data';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
    return {
        content: [
            header('Приложение №'),
            headline(
                'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ'
            ),
            paragraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                [`1.3. Фирменное наименование: ${data.basic.brandName}`, `1.4. СНИЛС №: ${data.basic.snils}`]
            ]),
            paragraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${data.contact.phone}`,
                    `2.2. Сайт (Url): ${data.contact.url}`,
                    `2.3. Email: ${data.contact.email}`
                ]
            ]),
            paragraph('3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО', [
                [
                    `3.1. Цели установления отношений: ${data.relationshipsWithNko.nkoRelationTarget}`,
                    `3.2. Характер отношений: ${data.relationshipsWithNko.relationshipWithNko}`
                ]
            ]),
            paragraph('4. Планируемые операции по счету, в месяц', [
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
            ]),
            paragraph('5. Адрес фактического осуществления (ведения) деятельности', [
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
            ]),
            paragraph('6. Тип документа, подтверждающий право нахождения по фактическому адресу', [
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
            ]),
            paragraph('7. Сведения о хозяйственной деятельности', [
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
            ]),
            paragraph('8. Принадлежность физического лица к некоторым категория граждан', [
                [
                    {
                        ...inlineCheckboxWithTitle(
                            '8.1. Принадлежность к категории ПДЛ¹',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.pdlCategory
                        ),
                        colSpan: 2
                    }
                ],
                [
                    inlineCheckboxWithTitle(
                        '8.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.pdl.pdlRelation
                    ),
                    `8.3. Степень родства: ${data.pdl.pdlRelationDegree}`
                ]
            ]),
            paragraph('9. Наличие выгодоприобретателя²', [
                [
                    inlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [YesNo.yes, 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)']
                        ],
                        data.benefitThirdParties
                    )
                ]
            ]),
            paragraph('10. Наличие бенефициарного владельца³', [
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
            ]),
            paragraph('11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве', [
                [inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.hasRelation)]
            ]),
            paragraph('12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства', [
                [inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.taxResident)]
            ])
        ],
        footer: [
            '¹ Публичные должностные лица, включая российские, иностранные и международные.',
            '² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.',
            '³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
        ].join('\n'),
        footerHeight: 1.5
    };
}
