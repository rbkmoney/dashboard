import { AuthorityConfirmingDocument } from '../../../../api-codegen/questionary';

export function getAuthorityConfirmingDocument(authorityConfirmingDocument: AuthorityConfirmingDocument) {
    return `${authorityConfirmingDocument.type} №${authorityConfirmingDocument.number} от ${authorityConfirmingDocument.date}`;
}
