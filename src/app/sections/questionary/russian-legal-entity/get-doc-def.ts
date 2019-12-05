import {
    createInlineCheckboxWithTitle,
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding
} from '../create-content';
import { getData } from './get-data';
import { createInlineCheckbox, createVerticalCheckboxWithTitle } from '../create-content';
import { YesNo, MonthOperationCount, MonthOperationSum, DocumentType } from '../select-data';
import { DocDef } from '../create-questionary';
import { AccountantInfo } from '../../../api-codegen/questionary';

export function getDocDef(data: ReturnType<typeof getData>): DocDef {
    return {
        content: [
            createHeader('Приложение №'),
            createHeadline('ОПРОСНЫЙ ЛИСТ – ЮРИДИЧЕСКОГО ЛИЦА (НЕ ЯВЛЯЮЩЕГОСЯ КРЕДИТНОЙ ОРГАНИЗАЦИЕЙ)'),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                [{ text: `1.3. Фирменное наименование: ${data.basic.brandName}`, colSpan: 2 }]
            ]),
            createVerticalParagraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${data.contact.phone}`,
                    `2.2. Сайт (Url): ${data.contact.url}`,
                    `2.3. Email: ${data.contact.email}`
                ]
            ]),
            createVerticalParagraph(
                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                [
                    [
                        `3.1. Цели установления отношений: ${data.relationshipsWithNko.nkoRelationTarget}`,
                        `3.2. Характер отношений: ${data.relationshipsWithNko.relationshipWithNko}`
                    ]
                ]
            ),
            createVerticalParagraph('4. Планируемые операции, в месяц', [
                [
                    createVerticalCheckboxWithTitle(
                        '4.1. Количество операций:',
                        [
                            [MonthOperationCount.LtTen, 'до 10'],
                            [MonthOperationCount.BtwTenToFifty, '10 - 50'],
                            [MonthOperationCount.GtFifty, 'свыше 50']
                        ],
                        data.monthOperation.monthOperationCount
                    ),
                    createVerticalCheckboxWithTitle(
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
            createVerticalParagraph('5. Сведения о единоличном исполнительном органе юридического лица', [
                [{ text: `5.1. ФИО Единоличного исполнительного органа: ${data.legalOwnerInfo.fio}`, colSpan: 2 }],
                [
                    {
                        text: `5.2. Действует на основании: ${data.legalOwnerInfo.authorityConfirmingDocument}`,
                        colSpan: 2
                    }
                ],
                [
                    `5.3. СНИЛС №: ${data.legalOwnerInfo.snils}`,
                    `5.4. Контактная информация (телефон, email): ${data.legalOwnerInfo.contact}`
                ]
            ]),
            createVerticalParagraph('6. Данные о фактическом местонахождении органа управления (Руководителя)', [
                [
                    `6.1. Страна: ${data.address.country}`,
                    { text: `6.2. Область/Регион: ${data.address.region}`, colSpan: 2 }
                ],
                [
                    `6.3. Город: ${data.address.city}`,
                    `6.4. Улица: ${data.address.street}`,
                    `6.5. Дом: ${data.address.number}`
                ],
                [
                    `6.6. Корпус/Строение: ${data.address.building}`,
                    `6.7. Офис/Помещение: ${data.address.office}`,
                    `6.8. Площадь (кв.м.): ${data.address.area}`
                ]
            ]),

            createVerticalParagraph(
                '7. Тип документа, подтверждающий право нахождения по фактическому адресу органа управления (Руководителя)',
                [
                    [
                        createInlineCheckbox(
                            [
                                [DocumentType.LeaseContract, 'Договор аренды'],
                                [DocumentType.SubleaseContract, 'Договор субаренды'],
                                [DocumentType.CertificateOfOwnership, 'Свидетельство о праве собственности']
                            ],
                            data.documentType
                        )
                    ]
                ]
            ),
            createVerticalParagraph('8. Сведения о хозяйственной деятельности организации', [
                [
                    createInlineCheckboxWithTitle(
                        '8.1. Наличие в штате главного бухгалтера',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.business.hasChiefAccountant
                    ),
                    `8.2. Штатная численность в организации: ${data.business.staffCount}`
                ],
                [
                    {
                        ...createVerticalCheckboxWithTitle(
                            '8.3. Бухгалтерский учет осуществляет:',
                            [
                                [
                                    AccountantInfo.AccountantInfoTypeEnum.WithoutChiefHeadAccounting,
                                    'Руководитель организации'
                                ],
                                [
                                    AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountingOrganization,
                                    `Организация ведущая бух. учет: ИНН: ${data.business.accountingOrgInn}`
                                ],
                                [
                                    AccountantInfo.AccountantInfoTypeEnum.WithoutChiefIndividualAccountant,
                                    'Бухгалтер – индивидуальный специалист'
                                ]
                            ],
                            data.business.accounting
                        ),
                        colSpan: 2
                    }
                ]
            ]),
            createVerticalParagraph(
                '9. Принадлежность Единоличного исполнительного органа к некоторым категориям граждан',
                [
                    [
                        {
                            ...createInlineCheckboxWithTitle(
                                '9.1. Принадлежность к категории ПДЛ¹',
                                [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                                data.pdl.pdlCategory
                            ),
                            colSpan: 2
                        }
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '9.2. Является родственником ПДЛ',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.pdlRelation
                        ),
                        `9.3. Степень родства: ${data.pdl.pdlRelationDegree}`
                    ]
                ]
            ),
            createVerticalParagraph('10. Наличие выгодоприобретателя²', [
                [
                    [
                        createInlineCheckbox(
                            [
                                [YesNo.no, 'Нет'],
                                [YesNo.yes, 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)']
                            ],
                            data.benefitThirdParties
                        )
                    ]
                ]
            ]),
            createVerticalParagraph('11. Наличие бенефициарного владельца³', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [YesNo.yes, 'Да (обязательное заполнение приложение для Бенефициарного владельца)']
                        ],
                        data.hasBeneficialOwner
                    )
                ]
            ]),
            createVerticalParagraph(
                '12. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве, в отношении Вашей компании',
                [[createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.hasRelation)]]
            ),
            createVerticalParagraph('13. Информация об иностранном налоговом резидентстве', [
                [
                    {
                        text:
                            '13.1. Является ли Ваша организация налоговым резидентом США или иного иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.taxResident)
                ],
                [
                    {
                        text:
                            '13.2. Является ли Бенефициарный владелец Вашей организации с долей владения 10% и более налоговым резидентом иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.ownerResident)
                ],
                [
                    {
                        text:
                            '13.3. Является ли Ваша организация Финансовым Институтом в соответствии с FATCA и 173-ФЗ от 28.06.2014?',
                        colSpan: 5
                    },
                    createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.fatca)
                ]
            ]),
            createEnding()
        ],
        footer: [
            '¹ Публичные должностные лица, включая российские, иностранные и международные.',
            '² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.',
            '³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
        ].join('\n'),
        footerHeight: 1.5
    };
}
