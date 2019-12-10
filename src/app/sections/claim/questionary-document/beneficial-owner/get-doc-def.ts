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
import { YesNo, getContactInfo, toYesNo, getIdentityDocument, getDate, getPercent } from '../select-data';
import { BeneficialOwner } from '../../../../api-codegen/questionary';
import { getResidencyInfo } from './get-residency-info';
import { createCompanyHeader } from './create-company-header';

const EMPTY = '-';

export function getDocDef(beneficialOwner: BeneficialOwner, companyName: string, companyInn: string): DocDef {
    const {
        russianPrivateEntity,
        migrationCardInfo = {},
        residenceApprove = {},
        ownershipPercentage,
        inn,
        snils
    } = beneficialOwner;
    const identityDocument = getIdentityDocument(beneficialOwner.identityDocument);
    const residencyInfo = getResidencyInfo(beneficialOwner.residencyInfo);

    const { fio, birthPlace, citizenship, actualAddress: address } = russianPrivateEntity;
    const contactInfo = getContactInfo(russianPrivateEntity.contactInfo || {});
    const birthDate = russianPrivateEntity.birthDate;

    return {
        content: [
            createHeader('Приложение №'),
            createCompanyHeader(companyName, companyInn),
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
            createInlineParagraph(
                '2. Процент владения капиталом юридического лица',
                getPercent(ownershipPercentage) || EMPTY
            ),
            createInlineParagraph('3. Фамилия, Имя, Отчество (при наличии)', fio || EMPTY),
            createInlineParagraph('4. Дата рождения', getDate(birthDate) || EMPTY),
            createInlineParagraph('5. Место рождения', birthPlace || EMPTY),
            createInlineParagraph('6. Гражданство', citizenship || EMPTY),
            createInlineParagraph('7. ИНН (при наличии)', inn || EMPTY),
            createInlineParagraph('8. Реквизиты документа, удостоверяющего личность', [
                [`8.1. Вид документа: ${identityDocument.name || EMPTY}`],
                [`8.2. Серия и номер: ${identityDocument.seriesNumber || EMPTY}`],
                [
                    `8.3. Наименование органа, выдавшего документ, код подразделения (при наличии): ${identityDocument.issuer ||
                        EMPTY}`
                ],
                [`8.4. Дата выдачи: ${getDate(identityDocument.issuedAt) || EMPTY}`]
            ]),
            createInlineParagraph('9. Данные миграционной карты¹', [
                [`9.1. Номер карты: ${migrationCardInfo.cardNumber || EMPTY}`],
                [`9.2. Дата начала срока пребывания в РФ: ${getDate(migrationCardInfo.beginningDate) || EMPTY}`],
                [`9.3. Дата окончания срока пребывания в РФ: ${getDate(migrationCardInfo.expirationDate) || EMPTY}`]
            ]),
            createInlineParagraph(
                '10. Данные документа, подтверждающего право иностранного гражданина или лица без гражданства на пребывание (проживание) в РФ1¹',
                [
                    [`10.1. Вид документа: ${residenceApprove.name || EMPTY}`],
                    [`10.2. Серия (при наличии): ${residenceApprove.series || EMPTY}`],
                    [`10.3. Номер документа: ${residenceApprove.number || EMPTY}`],
                    [`10.4. Дата начала срока действия: ${getDate(residenceApprove.beginningDate) || EMPTY}`],
                    [`10.5. Дата окончания срока действия: ${getDate(residenceApprove.expirationDate) || EMPTY}`]
                ]
            ),
            createInlineParagraph('11. Адрес места жительства (регистрации) или места пребывания', address || EMPTY),
            createInlineParagraph('12. СНИЛС (при наличии)', snils || EMPTY),
            createInlineParagraph('13. Контактная информация (телефон/email)', contactInfo || EMPTY),
            createVerticalParagraph('14. Принадлежность физического лица к некоторым категориям лиц', [
                [
                    createInlineCheckboxWithTitle(
                        '14.1. Принадлежность к категории ПДЛ²',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        toYesNo(beneficialOwner.pdlCategory)
                    )
                ],
                [
                    createInlineCheckboxWithTitle(
                        '14.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        toYesNo(!!beneficialOwner.pdlRelationDegree)
                    ),
                    `14.3. Степень родства: ${beneficialOwner.pdlRelationDegree || EMPTY}`
                ],
                [
                    createInlineCheckboxWithTitle(
                        '14.4. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом США?',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        toYesNo(residencyInfo.usaTaxResident)
                    )
                ],
                [
                    createInlineCheckboxWithTitle(
                        '14.5. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом иного иностранного государства (кроме США)?',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        toYesNo(residencyInfo.exceptUsaTaxResident)
                    )
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
