import { RussianDomesticPassport, IdentityDocument } from '../../api-codegen/questionary';

function isRussianDomesticPassport(identityDocument: IdentityDocument): identityDocument is RussianDomesticPassport {
    return identityDocument && identityDocument.identityDocumentType === 'RussianDomesticPassport';
}

export function getIdentityDocument(
    identityDocument: IdentityDocument
): { name?: string; seriesNumber?: string; issuer?: string; issuedAt?: string } | null {
    if (isRussianDomesticPassport(identityDocument)) {
        const { seriesNumber, issuer, issuedAt, issuerCode } = identityDocument;
        return {
            name: 'Паспорт РФ',
            seriesNumber,
            issuer: [issuer, issuerCode].filter(i => !!i).join(', '),
            issuedAt
        };
    }
    console.error('Unknown identity document');
    return {};
}
