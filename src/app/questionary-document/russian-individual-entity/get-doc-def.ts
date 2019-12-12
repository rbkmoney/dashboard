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
import { YesNo, getShopLocationURL, getBusinessInfo, toYesNo } from '../select-data';
import {
    AccountantInfo,
    MonthOperationCount,
    MonthOperationSum,
    PropertyInfoDocumentType
} from '../../api-codegen/questionary';
import { getIndividualEntityName } from './get-individual-entity-name';
import { RussianIndividualEntityQuestionary } from '../../api';

const DocumentType = PropertyInfoDocumentType.DocumentTypeEnum;

const EMPTY = '-';

export function getDocDef({
    data: {
        contractor: {
            individualEntity: {
                additionalInfo,
                additionalInfo: {
                    nkoRelationTarget,
                    relationshipWithNko,
                    monthOperationSum,
                    monthOperationCount,
                    benefitThirdParties,
                    relationIndividualEntity
                } = {},
                russianPrivateEntity: { fio } = {},
                registrationInfo: { registrationPlace } = {} as any,
                inn,
                snils,
                propertyInfoDocumentType: { documentType } = {} as any,
                individualPersonCategories: { foreignPublicPerson, foreignRelativePerson } = {},
                beneficialOwners,
                residencyInfo: { usaTaxResident } = {} as any
            } = {} as any
        } = {} as any,
        shopInfo: { details: { name: brandName } = {}, location } = {},
        contactInfo: { phoneNumber, email } = {}
    }
}: RussianIndividualEntityQuestionary): DocDef {
    const name = getIndividualEntityName(fio);
    const url = getShopLocationURL(location);
    const { hasChiefAccountant, staffCount, accountingOrgInn, accounting } = getBusinessInfo(additionalInfo);
    const pdlRelationDegree = ''; // TODO
    const hasBeneficialOwner = Array.isArray(beneficialOwners) && !!beneficialOwners.length;

    return {
        content: [
            createHeader('Приложение №'),
            createHeadline(
                'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ'
            ),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${name || EMPTY}`, `1.2. ИНН: ${inn || EMPTY}`],
                [`1.3. Фирменное наименование: ${brandName || EMPTY}`, `1.4. СНИЛС №: ${snils || EMPTY}`]
            ]),
            createVerticalParagraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${phoneNumber || EMPTY}`,
                    `2.2. Сайт (Url): ${url || EMPTY}`,
                    `2.3. Email: ${email || EMPTY}`
                ]
            ]),
            createVerticalParagraph(
                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                [
                    [
                        `3.1. Цели установления отношений: ${nkoRelationTarget || EMPTY}`,
                        `3.2. Характер отношений: ${relationshipWithNko || EMPTY}`
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
                        monthOperationCount
                    ),
                    createVerticalCheckboxWithTitle(
                        '4.2. Сумма операций:',
                        [
                            [MonthOperationSum.LtFiveHundredThousand, 'до 500 000'],
                            [MonthOperationSum.BtwFiveHundredThousandToOneMillion, '500 000 - 1 000 000'],
                            [MonthOperationSum.GtOneMillion, 'свыше 1 000 000']
                        ],
                        monthOperationSum
                    )
                ]
            ]),
            createVerticalParagraph(
                '5. Адрес фактического осуществления (ведения) деятельности',
                registrationPlace || EMPTY
            ),
            createVerticalParagraph('6. Тип документа, подтверждающий право нахождения по фактическому адресу', [
                [
                    createInlineCheckbox(
                        [
                            [DocumentType.LeaseContract, 'Договор аренды'],
                            [DocumentType.SubleaseContract, 'Договор субаренды'],
                            [DocumentType.CertificateOfOwnership, 'Свидетельство о праве собственности']
                        ],
                        documentType
                    )
                ]
            ]),
            createVerticalParagraph('7. Сведения о хозяйственной деятельности', [
                [
                    createInlineCheckboxWithTitle(
                        '7.1. Наличие в штате главного бухгалтера',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        hasChiefAccountant
                    ),
                    `7.2. Штатная численность в организации: ${staffCount || EMPTY}`
                ],
                [
                    {
                        ...createVerticalCheckboxWithTitle(
                            '7.3. Бухгалтерский учет осуществляет:',
                            [
                                [AccountantInfo.AccountantInfoTypeEnum.WithoutChiefHeadAccounting, 'ИП лично'],
                                [
                                    AccountantInfo.AccountantInfoTypeEnum.WithoutChiefAccountingOrganization,
                                    `Организация ведущая бух. учет: ИНН: ${accountingOrgInn || EMPTY}`
                                ],
                                [
                                    AccountantInfo.AccountantInfoTypeEnum.WithoutChiefIndividualAccountant,
                                    'Бухгалтер – индивидуальный специалист'
                                ]
                            ],
                            accounting
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
                            toYesNo(foreignPublicPerson)
                        ),
                        colSpan: 2
                    }
                ],
                [
                    createInlineCheckboxWithTitle(
                        '8.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        toYesNo(foreignRelativePerson)
                    ),
                    `8.3. Степень родства: ${pdlRelationDegree || EMPTY}`
                ]
            ]),
            createVerticalParagraph('9. Наличие выгодоприобретателя²', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [YesNo.yes, 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)']
                        ],
                        toYesNo(benefitThirdParties)
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
                        toYesNo(hasBeneficialOwner)
                    )
                ]
            ]),
            createVerticalParagraph(
                '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                [[createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], toYesNo(!!relationIndividualEntity))]]
            ),
            createVerticalParagraph('12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства', [
                [createInlineCheckbox([[YesNo.yes, 'Да'], [YesNo.no, 'Нет']], toYesNo(usaTaxResident))]
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
