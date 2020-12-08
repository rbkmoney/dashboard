import { IdentityDocument, RussianDomesticPassport } from '@dsh/api-codegen/questionary';

import { FormValue } from '../../form-value';

export const applyToIdentityDocument = (
    identityDocument: IdentityDocument,
    { seriesNumber, issuer, issuerCode, issuedAt }: FormValue
): RussianDomesticPassport => ({
    ...identityDocument,
    identityDocumentType: 'RussianDomesticPassport',
    issuer,
    issuerCode,
    issuedAt,
    seriesNumber,
});
