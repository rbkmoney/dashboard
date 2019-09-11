import { inlineCheckboxWithTitle, paragraph, header, headline } from '../create-content';
import { getData } from './get-data';
import { inlineCheckbox, verticalCheckboxWithTitle } from '../create-content';
import { YesNo, MonthOperationCount, MonthOperationSum, DocumentType, AccountingType } from '../select-data';
import { Data } from '../create-questionary';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
    return {
        content: [
            header('Приложение №'),
            headline('ОПРОСНЫЙ ЛИСТ – ЮРИДИЧЕСКОГО ЛИЦА (НЕ ЯВЛЯЮЩЕГОСЯ КРЕДИТНОЙ ОРГАНИЗАЦИЕЙ)'),
            paragraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                [{ text: `1.3. Фирменное наименование: ${data.basic.brandName}`, colSpan: 2 }]
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
            paragraph('4. Планируемые операции, в месяц', [
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
            paragraph('5. Сведения о единоличном исполнительном органе юридического лица', [
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
            paragraph('6. Данные о фактическом местонахождении органа управления (Руководителя)', [
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

            paragraph(
                '7. Тип документа, подтверждающий право нахождения по фактическому адресу органа управления (Руководителя)',
                [
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
            ),
            paragraph('8. Сведения о хозяйственной деятельности организации', [
                [
                    inlineCheckboxWithTitle(
                        '8.1. Наличие в штате главного бухгалтера',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.business.hasChiefAccountant
                    ),
                    `8.2. Штатная численность в организации: ${data.business.staffCount}`
                ],
                [
                    {
                        ...verticalCheckboxWithTitle(
                            '8.3. Бухгалтерский учет осуществляет:',
                            [
                                [AccountingType.HeadAccounting, 'Руководитель организации'],
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
            paragraph('9. Принадлежность Единоличного исполнительного органа к некоторым категориям граждан', [
                [
                    {
                        ...inlineCheckboxWithTitle(
                            '9.1. Принадлежность к категории ПДЛ¹',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.pdlCategory
                        ),
                        colSpan: 2
                    }
                ],
                [
                    inlineCheckboxWithTitle(
                        '9.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.pdl.pdlRelation
                    ),
                    `9.3. Степень родства: ${data.pdl.pdlRelationDegree}`
                ]
            ]),
            paragraph('10. Наличие выгодоприобретателя²', [
                [
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
            ]),
            paragraph('11. Наличие бенефициарного владельца³', [
                [
                    inlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [YesNo.yes, 'Да (обязательное заполнение приложение для Бенефициарного владельца)']
                        ],
                        data.hasBeneficialOwner
                    )
                ]
            ]),
            paragraph(
                '12. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве, в отношении Вашей компании',
                [[inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.hasRelation)]]
            ),
            paragraph('13. Информация об иностранном налоговом резидентстве', [
                [
                    {
                        text:
                            '13.1. Является ли Ваша организация налоговым резидентом США или иного иностранного государства?',
                        colSpan: 5
                    },
                    inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.taxResident)
                ],
                [
                    {
                        text:
                            '13.2. Является ли Бенефициарный владелец Вашей организации с долей владения 10% и более налоговым резидентом иностранного государства?',
                        colSpan: 5
                    },
                    inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.ownerResident)
                ],
                [
                    {
                        text:
                            '13.3. Является ли Ваша организация Финансовым Институтом в соответствии с FATCA и 173-ФЗ от 28.06.2014?',
                        colSpan: 5
                    },
                    inlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.residencyInfo.fatca)
                ]
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
