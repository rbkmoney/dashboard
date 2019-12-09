import { DocDef } from '../create-questionary';
import {
    createVerticalCheckboxWithTitle,
    createInlineCheckboxWithTitle,
    createInlineCheckbox,
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding
} from '../create-content';
import { YesNo, DocumentType, getShopLocationURL, getDocumentType, getBusinessInfo, toYesNo } from '../select-data';
import { AccountantInfo, MonthOperationCount, MonthOperationSum } from '../../../../api-codegen/questionary';
import { RussianIndividualEntityQuestionary } from '.';
import { getIndividualEntityName } from './get-individual-entity-name';

export function getDocDef(q: RussianIndividualEntityQuestionary): DocDef {
    const { individualEntity } = q.data.contractor;
    const { additionalInfo, russianPrivateEntity, residencyInfo, registrationInfo } = individualEntity;

    const data = {
        basic: {
            inn: individualEntity.inn,
            name: getIndividualEntityName(russianPrivateEntity.fio),
            brandName: q.data.shopInfo.details.name,
            snils: individualEntity.snils
        },
        contact: {
            phone: q.data.contactInfo.phoneNumber,
            url: getShopLocationURL(q.data.shopInfo.location),
            email: q.data.contactInfo.email
        },
        relationshipsWithNko: {
            nkoRelationTarget: additionalInfo.nkoRelationTarget,
            relationshipWithNko: additionalInfo.relationshipWithNko
        },
        monthOperation: {
            monthOperationSum: additionalInfo.monthOperationSum,
            monthOperationCount: additionalInfo.monthOperationCount
        },
        // TODO
        address: {
            country: '-',
            region: '-',
            city: '-',
            street: registrationInfo.registrationPlace,
            number: '-',
            building: '-',
            office: '-',
            area: '-'
        },
        documentType: getDocumentType(individualEntity.propertyInfoDocumentType.documentType),
        business: getBusinessInfo(additionalInfo),
        pdl: {
            pdlCategory: toYesNo(individualEntity.individualPersonCategories.foreignPublicPerson),
            pdlRelation: toYesNo(individualEntity.individualPersonCategories.foreignRelativePerson),
            pdlRelationDegree: '' // TODO
        },
        benefitThirdParties: toYesNo(additionalInfo.benefitThirdParties),
        hasBeneficialOwner: toYesNo(!!individualEntity.beneficialOwners && !!individualEntity.beneficialOwners.length),
        hasRelation: toYesNo(!!additionalInfo.relationIndividualEntity),
        taxResident: toYesNo(residencyInfo.usaTaxResident)
    };

    return {
        content: [
            createHeader('Приложение №'),
            createHeadline(
                'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ'
            ),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                [`1.3. Фирменное наименование: ${data.basic.brandName}`, `1.4. СНИЛС №: ${data.basic.snils}`]
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
            createVerticalParagraph('4. Планируемые операции по счету, в месяц', [
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
            createVerticalParagraph('5. Адрес фактического осуществления (ведения) деятельности', [
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
            createVerticalParagraph('6. Тип документа, подтверждающий право нахождения по фактическому адресу', [
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
            ]),
            createVerticalParagraph('7. Сведения о хозяйственной деятельности', [
                [
                    createInlineCheckboxWithTitle(
                        '7.1. Наличие в штате главного бухгалтера',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.business.hasChiefAccountant
                    ),
                    `7.2. Штатная численность в организации: ${data.business.staffCount}`
                ],
                [
                    {
                        ...createVerticalCheckboxWithTitle(
                            '7.3. Бухгалтерский учет осуществляет:',
                            [
                                [AccountantInfo.AccountantInfoTypeEnum.WithoutChiefHeadAccounting, 'ИП лично'],
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
            createVerticalParagraph('8. Принадлежность физического лица к некоторым категория граждан', [
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '8.1. Принадлежность к категории ПДЛ¹',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.pdlCategory
                        ),
                        colSpan: 2
                    }
                ],
                [
                    createInlineCheckboxWithTitle(
                        '8.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.pdl.pdlRelation
                    ),
                    `8.3. Степень родства: ${data.pdl.pdlRelationDegree}`
                ]
            ]),
            createVerticalParagraph('9. Наличие выгодоприобретателя²', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [YesNo.yes, 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)']
                        ],
                        data.benefitThirdParties
                    )
                ]
            ]),
            createVerticalParagraph('10. Наличие бенефициарного владельца³', [
                [
                    createInlineCheckbox(
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
            createVerticalParagraph(
                '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                [[createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.hasRelation)]]
            ),
            createVerticalParagraph('12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства', [
                [createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], data.taxResident)]
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
