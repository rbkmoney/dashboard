import { Claim } from '../../../../../api-codegen/claim-management';
import { getClaimType } from './get-claim-type';

export function filterViewClaims(claims: Claim[]): Claim[] {
    return claims.filter(claim => getClaimType(claim.changeset) !== null);
}
