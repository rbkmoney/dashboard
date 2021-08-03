import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '@dsh/api-codegen/claim-management';
import { isClaimModification, isDocumentModificationUnit } from '@dsh/api/claims';

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> =>
    s.pipe(
        map((claims) =>
            claims.filter((claim) =>
                claim.changeset.some(
                    ({ modification }) =>
                        isClaimModification(modification) &&
                        isDocumentModificationUnit(modification.claimModificationType)
                )
            )
        )
    );
