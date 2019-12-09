import { DocDef } from '../create-questionary';
import {
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding,
    createInlineCheckboxWithTitle,
    createInlineParagraph,
    createHorizontalCheckbox
} from '../create-content';
import { YesNo, getContactInfo, toYesNo } from '../select-data';
import { createCaptionedText } from '../create-content/create-captioned-text';
import { cmToIn } from '../../../../document';
import { BeneficialOwner, RussianDomesticPassport } from '../../../../api-codegen/questionary';
import { getResidencyInfo } from './get-residency-info';

export function getDocDef(beneficialOwner: BeneficialOwner, companyName: string, companyInn: number): DocDef {
    const { russianPrivateEntity } = beneficialOwner;
    const migrationCardInfo = beneficialOwner.migrationCardInfo || {};
    const residenceApprove = beneficialOwner.residenceApprove || {};
    const identityDocument = beneficialOwner.identityDocument as RussianDomesticPassport;
    const residencyInfo = getResidencyInfo(beneficialOwner.residencyInfo);
    const { ownershipPercentage, inn, snils } = beneficialOwner;
    const { fio, birthDate, birthPlace, citizenship, actualAddress: address } = russianPrivateEntity;
    const contactInfo = getContactInfo(russianPrivateEntity.contactInfo || {});

    const data = {
        identityDocument: {
            name: 'Паспорт РФ',
            seriesNumber: identityDocument.seriesNumber,
            issuer: [identityDocument.issuer, identityDocument.issuerCode].filter(i => !!i).join(', '),
            issuedAt: identityDocument.issuedAt
        },
        migrationCardInfo: {
            cardNumber: migrationCardInfo.cardNumber,
            beginningDate: migrationCardInfo.beginningDate,
            expirationDate: migrationCardInfo.expirationDate
        },
        residenceApprove: {
            name: residenceApprove.name,
            series: residenceApprove.series,
            number: residenceApprove.number,
            beginningDate: residenceApprove.beginningDate,
            expirationDate: residenceApprove.expirationDate
        },
        pdl: {
            pdlCategory: toYesNo(beneficialOwner.pdlCategory),
            pdlRelation: toYesNo(!!beneficialOwner.pdlRelationDegree),
            pdlRelationDegree: beneficialOwner.pdlRelationDegree,
            usaTaxResident: toYesNo(residencyInfo.usaTaxResident),
            exceptUsaTaxResident: toYesNo(residencyInfo.exceptUsaTaxResident)
        }
    };

    return {
        content: [
            createHeader('Приложение №'),
            {
                columns: [
                    { ...createCaptionedText(companyName, 'Наименование вашей компании'), width: 'auto' },
                    { ...createCaptionedText(String(companyInn), 'ИНН'), width: 'auto' }
                ],
                columnGap: cmToIn(2)
            },
            createHeadline('АНКЕТА ФИЗИЧЕСКОГО ЛИЦА - БЕНЕФИЦИАРНОГО ВЛАДЕЛЬЦА'),
            createVerticalParagraph('1. Бенефициарный владелец', [
                [
                    createHorizontalCheckbox(
                        [
                            'лицо, не указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров, но которое косвенно владеет более 25% в капитале компании или контролирует действия компании',
                            'лицо, указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров (участник/акционер), владеющее в конечном счете более 25% в капитале компании'
                        ],
                        -1 // TODO
                    )
                ]
            ]),
            createInlineParagraph('2. Процент владения капиталом юридического лица', [[`${ownershipPercentage}%`]]),
            createInlineParagraph('3. Фамилия, Имя, Отчество (при наличии)', [[fio]]),
            createInlineParagraph('4. Дата рождения', [[birthDate]]),
            createInlineParagraph('5. Место рождения', [[birthPlace]]),
            createInlineParagraph('6. Гражданство', [[citizenship]]),
            createInlineParagraph('7. ИНН (при наличии)', [[inn]]),
            createInlineParagraph('8. Реквизиты документа, удостоверяющего личность', [
                [`8.1. Вид документа: ${data.identityDocument.name}`],
                [`8.2. Серия и номер: ${data.identityDocument.seriesNumber}`],
                [
                    `8.3. Наименование органа, выдавшего документ, код подразделения (при наличии): ${data.identityDocument.issuer}`
                ],
                [`8.4. Дата выдачи: ${data.identityDocument.issuedAt}`]
            ]),
            createInlineParagraph('9. Данные миграционной карты¹', [
                [`9.1. Номер карты: ${data.migrationCardInfo.cardNumber}`],
                [`9.2. Дата начала срока пребывания в РФ: ${data.migrationCardInfo.beginningDate}`],
                [`9.3. Дата окончания срока пребывания в РФ: ${data.migrationCardInfo.expirationDate}`]
            ]),
            createInlineParagraph(
                '10. Данные документа, подтверждающего право иностранного гражданина или лица без гражданства на пребывание (проживание) в РФ1¹',
                [
                    [`10.1. Вид документа: ${data.residenceApprove.name}`],
                    [`10.2. Серия (при наличии): ${data.residenceApprove.series}`],
                    [`10.3. Номер документа: ${data.residenceApprove.number}`],
                    [`10.4. Дата начала срока действия: ${data.residenceApprove.beginningDate}`],
                    [`10.5. Дата окончания срока действия: ${data.residenceApprove.expirationDate}`]
                ]
            ),
            createInlineParagraph('11. Адрес места жительства (регистрации) или места пребывания', [[address]]),
            createInlineParagraph('12. СНИЛС (при наличии)', [[snils]]),
            createInlineParagraph('13. Контактная информация (телефон/email)', [[contactInfo]]),
            createVerticalParagraph('14. Принадлежность физического лица к некоторым категориям лиц', [
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.1. Принадлежность к категории ПДЛ²',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.pdlCategory
                        ),
                        colSpan: 2
                    }
                ],
                [
                    createInlineCheckboxWithTitle(
                        '14.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        data.pdl.pdlRelation
                    ),
                    `14.3. Степень родства: `
                ],
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.4. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом США?',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.usaTaxResident
                        ),
                        colSpan: 2
                    }
                ],
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.5. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом иного иностранного государства (кроме США)?',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            data.pdl.exceptUsaTaxResident
                        ),
                        colSpan: 2
                    }
                ]
            ]),
            createEnding()
        ],
        footer: [
            '¹ Заполняется только для иностранных граждан и лиц без гражданства, находящихся на территории РФ в случае, если необходимость наличия у них данного документа предусмотрена законодательством РФ',
            '² Публичные должностные лица, включая российские, иностранные и международные.'
        ].join('\n'),
        footerHeight: 1
    };
}
