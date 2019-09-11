import { Data } from '../create-questionary';
import { getData } from './get-data';
import {
    createInlineCheckbox,
    createParagraph,
    createHeader,
    createHeadline,
    createEnding,
    createInlineCheckboxWithTitle
} from '../create-content';
import { YesNo } from '../select-data';

export function getTemplateWithData(data: ReturnType<typeof getData>): Data {
    return {
        content: [
            createHeader('Приложение №'),
            createHeadline('АНКЕТА ФИЗИЧЕСКОГО ЛИЦА - БЕНЕФИЦИАРНОГО ВЛАДЕЛЬЦА'),
            createParagraph('1. Бенефициарный владелец', [
                [
                    createInlineCheckbox(
                        [
                            'лицо, не указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров, но которое косвенно владеет более 25% в капитале компании или контролирует действия компании',
                            'лицо, указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров (участник/акционер), владеющее в конечном счете более 25% в капитале компании'
                        ],
                        data.test
                    )
                ]
            ]),
            createParagraph('14. Принадлежность физического лица к некоторым категориям лиц', [
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.1. Принадлежность к категории ПДЛ²',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            YesNo.yes
                        ),
                        colSpan: 2
                    }
                ],
                [
                    createInlineCheckboxWithTitle(
                        '14.2. Является родственником ПДЛ',
                        [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                        YesNo.yes
                    ),
                    `14.3. Степень родства: `
                ],
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.4. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом США?',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            YesNo.yes
                        ),
                        colSpan: 2
                    }
                ],
                [
                    {
                        ...createInlineCheckboxWithTitle(
                            '14.5. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом иного иностранного государства (кроме США)?',
                            [[YesNo.yes, 'Да'], [YesNo.no, 'Нет']],
                            YesNo.yes
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
