import { AuthorityConfirmingDocument } from '../../api-codegen/questionary';

export function getAuthorityConfirmingDocument(authorityConfirmingDocument: AuthorityConfirmingDocument): string {
    return authorityConfirmingDocument
        ? `${authorityConfirmingDocument.type} №${authorityConfirmingDocument.number} от ${authorityConfirmingDocument.date}`
        : null;
}
