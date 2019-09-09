import { Data, inlineCheckboxWithTitle } from '../create-questionary';
import { getData } from './get-data';
import { inlineCheckbox, verticalCheckboxWithTitle } from '../create-questionary';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
    return {
        header: 'Приложение №',
        headline: 'ОПРОСНЫЙ ЛИСТ – ЮРИДИЧЕСКОГО ЛИЦА (НЕ ЯВЛЯЮЩЕГОСЯ КРЕДИТНОЙ ОРГАНИЗАЦИЕЙ)',
        paragraphs: [
            {
                title: '1. Основные сведения о Клиенте',
                content: [
                    [`1.1. Наименование: ${data.basic.name}`, `1.2. ИНН: ${data.basic.inn}`],
                    [{ text: `1.3. Фирменное наименование: ${data.basic.brandName}`, colSpan: 2 }]
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
                title: '4. Планируемые операции, в месяц',
                content: [
                    [
                        verticalCheckboxWithTitle(
                            '4.1. Количество операций:',
                            ['до 10', '10 - 50', 'свыше 50'],
                            data.monthOperation.monthOperationCount
                        ),
                        verticalCheckboxWithTitle(
                            '4.2. Сумма операций:',
                            ['до 500 000', '500 000 - 1 000 000', 'свыше 1 000 000'],
                            data.monthOperation.monthOperationSum
                        )
                    ]
                ]
            },
            {
                title: '5. Сведения о единоличном исполнительном органе юридического лица',
                content: [
                    [{ text: `5.1. ФИО Единоличного исполнительного органа: ${data.legalOwnerInfo.fio}`, colSpan: 2 }],
                    [{ text: `5.2. Действует на основании: ${data.legalOwnerInfo.basedOn}`, colSpan: 2 }],
                    [
                        `5.3. СНИЛС №: ${data.legalOwnerInfo.snils}`,
                        `5.4. Контактная информация (телефон, email): ${data.legalOwnerInfo.contact}`
                    ]
                ]
            },
            {
                title: '6. Данные о фактическом местонахождении органа управления (Руководителя)',
                content: [
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
                ]
            },
            {
                title:
                    '7. Тип документа, подтверждающий право нахождения по фактическому адресу органа управления (Руководителя)',
                content: [
                    [
                        inlineCheckbox(
                            ['Договор аренды', 'Договор субаренды', 'Свидетельство о праве собственности'],
                            data.documentType
                        )
                    ]
                ]
            },
            {
                title: '8. Сведения о хозяйственной деятельности организации',
                content: [
                    ['8.1. Наличие в штате главного бухгалтера:', '8.2. Штатная численность в организации:'],
                    [
                        {
                            ...verticalCheckboxWithTitle(
                                '8.3. Бухгалтерский учет осуществляет:',
                                [
                                    'Руководитель организации',
                                    `Организация ведущая бух. учет: ИНН: ${data.business.accountingOrgInn}`,
                                    'Бухгалтер – индивидуальный специалист'
                                ],
                                data.business.accounting
                            ),
                            colSpan: 2
                        }
                    ]
                ]
            },
            {
                title: '9. Принадлежность Единоличного исполнительного органа к некоторым категориям граждан',
                content: [
                    [
                        {
                            text: `9.1. Принадлежность к категории ПДЛ¹: ${data.individualPersonCategories.foreignPublicPerson}`,
                            colSpan: 2
                        }
                    ],
                    [
                        `9.2. Является родственником ПДЛ: ${data.individualPersonCategories.foreignRelativePerson}`,
                        `9.3. Степень родства: ${data.individualPersonCategories.relationDegree}`
                    ]
                ]
            },
            {
                title: '10. Наличие выгодоприобретателя²',
                content: [
                    [
                        [
                            inlineCheckbox(
                                ['Нет', 'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'],
                                data.benefitThirdParties
                            )
                        ]
                    ]
                ]
            },
            {
                title: '11. Наличие бенефициарного владельца³',
                content: [
                    [
                        inlineCheckbox(
                            ['Да', 'Да (обязательное заполнение приложение для Бенефициарного владельца)'],
                            data.hasBeneficialOwner
                        )
                    ]
                ]
            },
            {
                title:
                    '12. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве, в отношении Вашей компании',
                content: [[inlineCheckbox(['Да', 'Нет'], data.hasRelation)]]
            },
            {
                title: '13. Информация об иностранном налоговом резидентстве',
                content: [
                    [
                        inlineCheckboxWithTitle(
                            '13.1. Является ли Ваша организация налоговым резидентом США или иного иностранного государства?',
                            ['Да', 'Нет'],
                            data.residencyInfo.taxResident
                        )
                    ],
                    [
                        inlineCheckboxWithTitle(
                            '13.2. Является ли Бенефициарный владелец Вашей организации с долей владения 10% и более налоговым резидентом иностранного государства?',
                            ['Да', 'Нет'],
                            data.residencyInfo.ownerResident
                        )
                    ],
                    [
                        inlineCheckboxWithTitle(
                            '13.3. Является ли Ваша организация Финансовым Институтом в соответствии с FATCA и 173-ФЗ от 28.06.2014?',
                            ['Да', 'Нет'],
                            data.residencyInfo.fatca
                        )
                    ]
                ]
            }
        ],
        footer:
            '¹ Публичные должностные лица, включая российские, иностранные и международные.' +
            '\n² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.' +
            '\n³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
    };
}
