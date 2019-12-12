import { RussianDomesticPassport, IdentityDocument } from '../../../../api-codegen/questionary';

export function getIdentityDocument(
    identityDocument: IdentityDocument
): { name: string; seriesNumber: string; issuer: string; issuedAt: string } | null {
    switch (identityDocument.identityDocumentType) {
        case 'RussianDomesticPassport':
            const { seriesNumber, issuer, issuedAt, issuerCode } = identityDocument as RussianDomesticPassport;
            return {
                name: 'Паспорт РФ',
                seriesNumber,
                issuer: [issuer, issuerCode].filter(i => !!i).join(', '),
                issuedAt
            };
    }
    console.error('Unknown identity document');
    return null;
}
