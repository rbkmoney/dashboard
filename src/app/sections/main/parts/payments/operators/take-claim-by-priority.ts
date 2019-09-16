import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '../../../../../api-codegen/claim-management';

export const takeClaimByPriority = (s: Observable<[Claim[], Claim[], Claim[]]>): Observable<Claim | null> =>
    s.pipe(
        map(([pending, pendingAcceptance, review]) => {
            if (pending.length > 0) {
                return pending[0];
            }
            if (pendingAcceptance.length > 0) {
                return pendingAcceptance[0];
            }
            if (review.length > 0) {
                return review[0];
            }
            return null;
        })
    );
