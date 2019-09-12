import { Observable, iif, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Claim, StatusModificationUnit } from '../../../../../api-codegen/claim-management';

const claimToSubheading = (path: string, claim: Claim | null): string => {
    if (claim === null) {
        return `${path}.prestine`;
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return `${path}.onboardingPending`;
        case s.Review:
            return `${path}.onboardingReview`;
        case s.PendingAcceptance:
            return `${path}.onboardingReviewed`;
    }
    throw new Error('Unsupported claim status');
};

export const mapToSubheading = (basePath: string, claim: Observable<Claim>) => (
    s: Observable<boolean>
): Observable<string> => {
    const p = `${basePath}.subheading`;
    const fromClaimContent = claim.pipe(map(c => claimToSubheading(p, c)));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, of(`${p}.prestine`), fromClaimContent)));
};
