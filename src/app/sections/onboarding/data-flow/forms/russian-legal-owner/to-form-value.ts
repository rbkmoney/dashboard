import get from 'lodash-es/get';

import { AuthorityConfirmingDocument, QuestionaryData } from '@dsh/api-codegen/questionary';
import { AuthorityConfirmingDocumentType } from '@dsh/api/questionary';

import { FormValue } from '../form-value';
import {
    AuthorityConfirmingDocumentService,
    toPdlInfo,
    toPrivateEntityInfo,
    toRussianDomesticPassport,
} from '../subforms';

const toAuthorityConfirmingDocument = (d: AuthorityConfirmingDocument): FormValue => {
    const type = get(d, ['type'], null);
    const isCustomType = type && !Object.values(AuthorityConfirmingDocumentType).includes(type);
    return {
        type: isCustomType ? AuthorityConfirmingDocumentService.CustomType : type,
        customType: isCustomType ? type : null,
        date: get(d, ['date'], null),
        number: get(d, ['number'], null),
    };
};

export const toFormValue = (d: QuestionaryData): FormValue => {
    const i = get(d, ['contractor', 'legalEntity', 'legalOwnerInfo']);
    return {
        privateEntityInfo: toPrivateEntityInfo(i),
        headPosition: get(i, ['headPosition'], null),
        termOfOffice: get(i, ['termOfOffice'], null),
        russianDomesticPassport: toRussianDomesticPassport(get(i, ['identityDocument'])),
        pdlInfo: toPdlInfo(i),
        authorityConfirmingDocument: toAuthorityConfirmingDocument(get(i, ['authorityConfirmingDocument'])),
    };
};
