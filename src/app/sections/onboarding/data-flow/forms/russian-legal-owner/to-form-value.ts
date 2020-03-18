import get from 'lodash.get';

import { AuthorityConfirmingDocument, QuestionaryData } from '../../../../../api-codegen/questionary';
import { FormValue } from '../form-value';
import { toPdlInfo, toPrivateEntityInfo, toRussianDomesticPassport } from '../subforms';

const toAuthorityConfirmingDocument = (d: AuthorityConfirmingDocument): FormValue => ({
    type: get(d, ['type'], null),
    date: get(d, ['date'], null),
    number: get(d, ['number'], null)
});

export const toFormValue = (d: QuestionaryData): FormValue => {
    const i = get(d, ['contractor', 'legalEntity', 'legalOwnerInfo']);
    return {
        privateEntityInfo: toPrivateEntityInfo(i),
        headPosition: get(i, ['headPosition'], null),
        termOfOffice: get(i, ['termOfOffice'], null),
        russianDomesticPassport: toRussianDomesticPassport(get(i, ['identityDocument'])),
        pdlInfo: toPdlInfo(i),
        authorityConfirmingDocument: toAuthorityConfirmingDocument(get(i, ['authorityConfirmingDocument']))
    };
};
