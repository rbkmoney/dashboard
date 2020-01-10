import isEmpty from 'lodash.isempty';

import {
    createInlineCheckboxWithTitle,
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding
} from '../create-content';
import { createInlineCheckbox, createVerticalCheckboxWithTitle } from '../create-content';
import { YesNo, getShopLocationURL, getContactInfo, getBusinessInfo, toYesNo, simpleYesNo } from '../select-data';
import { DocDef } from '../create-questionary';
import {
    AccountantInfo,
    MonthOperationCount,
    MonthOperationSum,
    PropertyInfoDocumentType
} from '../../api-codegen/questionary';
import { RussianLegalEntityQuestionary } from '../../api';
import { getAuthorityConfirmingDocument } from './get-authority-confirming-document';
import { toOptional } from '../../../utils';

const DocumentType = PropertyInfoDocumentType.DocumentTypeEnum;
const AccountantInfoType = AccountantInfo.AccountantInfoTypeEnum;

const EMPTY = '';

export function getDocDef(questionary: RussianLegalEntityQuestionary): DocDef {
    const { data } = toOptional(questionary);
    const { contractor, shopInfo, contactInfo } = toOptional(data);
    const { location, details } = toOptional(shopInfo);
    const { name } = toOptional(details);
    const { phoneNumber, email } = toOptional(contactInfo);
    const { legalEntity } = toOptional(contractor);
    const {
        additionalInfo,
        inn,
        name: brandName,
        legalOwnerInfo,
        beneficialOwner,
        propertyInfoDocumentType,
        registrationInfo,
        residencyInfo
    } = toOptional(legalEntity);
    const { registrationPlace } = toOptional(registrationInfo);
    const { taxResident, fatca, ownerResident } = toOptional(residencyInfo);
    const {
        relationIndividualEntity,
        benefitThirdParties,
        nkoRelationTarget,
        relationshipWithNko,
        monthOperationSum,
        monthOperationCount
    } = toOptional(additionalInfo);
    const { pdlRelationDegree, pdlCategory, snils, authorityConfirmingDocument, russianPrivateEntity } = toOptional(
        legalOwnerInfo
    );
    const { fio, contactInfo: privateEntityContactInfo } = toOptional(russianPrivateEntity);
    const { documentType } = toOptional(propertyInfoDocumentType);

    const url = getShopLocationURL(location);
    const contact = getContactInfo(privateEntityContactInfo);
    const authorityConfirmingDocumentInfo = getAuthorityConfirmingDocument(authorityConfirmingDocument);
    const { hasChiefAccountant, staffCount, accounting, accountingOrgInn } = getBusinessInfo(additionalInfo);
    const hasBeneficialOwner = !isEmpty(beneficialOwner);

    return {
        content: [
            createHeader('Приложение №'),
            createHeadline('ОПРОСНЫЙ ЛИСТ – ЮРИДИЧЕСКОГО ЛИЦА (НЕ ЯВЛЯЮЩЕГОСЯ КРЕДИТНОЙ ОРГАНИЗАЦИЕЙ)'),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${name || EMPTY}`, `1.2. ИНН: ${inn || EMPTY}`],
                [{ text: `1.3. Фирменное наименование: ${brandName || EMPTY}`, colSpan: 2 }]
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
            createVerticalParagraph('4. Планируемые операции, в месяц', [
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
            createVerticalParagraph('5. Сведения о единоличном исполнительном органе юридического лица', [
                [{ text: `5.1. ФИО Единоличного исполнительного органа: ${fio || EMPTY}`, colSpan: 2 }],
                [
                    {
                        text: `5.2. Действует на основании: ${authorityConfirmingDocumentInfo || EMPTY}`,
                        colSpan: 2
                    }
                ],
                [`5.3. СНИЛС №: ${snils || EMPTY}`, `5.4. Контактная информация (телефон, email): ${contact || EMPTY}`]
            ]),
            createVerticalParagraph(
                '6. Данные о фактическом местонахождении органа управления (Руководителя)',
                registrationPlace || EMPTY
            ),
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
                            documentType
                        )
                    ]
                ]
            ),
            createVerticalParagraph('8. Сведения о хозяйственной деятельности организации', [
                [
                    createInlineCheckboxWithTitle(
                        '8.1. Наличие в штате главного бухгалтера',
                        simpleYesNo,
                        hasChiefAccountant
                    ),
                    `8.2. Штатная численность в организации: ${staffCount || EMPTY}`
                ],
                [
                    createVerticalCheckboxWithTitle(
                        '8.3. Бухгалтерский учет осуществляет:',
                        [
                            [AccountantInfoType.WithoutChiefHeadAccounting, 'Руководитель организации'],
                            [
                                AccountantInfoType.WithoutChiefAccountingOrganization,
                                `Организация ведущая бух. учет: ИНН: ${accountingOrgInn || EMPTY}`
                            ],
                            [
                                AccountantInfoType.WithoutChiefIndividualAccountant,
                                'Бухгалтер – индивидуальный специалист'
                            ]
                        ],
                        accounting
                    )
                ]
            ]),
            createVerticalParagraph(
                '9. Принадлежность Единоличного исполнительного органа к некоторым категориям граждан',
                [
                    [
                        createInlineCheckboxWithTitle(
                            '9.1. Принадлежность к категории ПДЛ¹',
                            simpleYesNo,
                            toYesNo(pdlCategory)
                        )
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '9.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(!!pdlRelationDegree)
                        ),
                        `9.3. Степень родства: ${pdlRelationDegree || EMPTY}`
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
                            toYesNo(benefitThirdParties)
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
                        toYesNo(hasBeneficialOwner)
                    )
                ]
            ]),
            createVerticalParagraph(
                '12. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве, в отношении Вашей компании',
                [[createInlineCheckbox(simpleYesNo, toYesNo(!!relationIndividualEntity))]]
            ),
            createVerticalParagraph('13. Информация об иностранном налоговом резидентстве', [
                [
                    {
                        text:
                            '13.1. Является ли Ваша организация налоговым резидентом США или иного иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(taxResident))
                ],
                [
                    {
                        text:
                            '13.2. Является ли Бенефициарный владелец Вашей организации с долей владения 10% и более налоговым резидентом иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(ownerResident))
                ],
                [
                    {
                        text:
                            '13.3. Является ли Ваша организация Финансовым Институтом в соответствии с FATCA и 173-ФЗ от 28.06.2014?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(fatca))
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
