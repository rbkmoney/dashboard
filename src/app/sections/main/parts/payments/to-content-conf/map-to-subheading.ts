import { iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Claim, StatusModificationUnit } from '@dsh/api-codegen/claim-management';

const claimToSubheading = (claim: Claim | null): string => {
    if (claim === null) {
        return 'pristine';
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return 'onboardingPending';
        case s.Review:
            return 'onboardingReview';
        case s.PendingAcceptance:
            return 'onboardingReviewed';
    }
    throw new Error('Unsupported claim status');
};

export const mapToSubheading =
    (claim: Observable<Claim>) =>
    (s: Observable<boolean>): Observable<string> => {
        const fromClaimContent = claim.pipe(map((c) => claimToSubheading(c)));
        return s.pipe(switchMap((isRealEnv) => iif(() => isRealEnv, of('pristine'), fromClaimContent)));
    };
