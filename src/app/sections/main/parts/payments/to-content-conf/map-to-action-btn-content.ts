import { Observable, of, iif } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Claim, StatusModificationUnit } from '../../../../../api-codegen/claim-management';
import { routeEnv } from '../../../../route-env';
import { ActionBtnContent } from '../content-config';

const toActionBtnContent = (actionLabel: string, routerLink: string): ActionBtnContent => ({
    routerLink,
    actionLabel,
    disabled: false
});

const claimToActionBtnContent = (claim: Claim | null): ActionBtnContent => {
    if (claim === null) {
        return toActionBtnContent('join', '/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return toActionBtnContent('continue', `/onboarding/${claim.id}`);
        case s.Review:
            return toActionBtnContent('claimDetails', `/claim/${claim.id}/conversation`);
        case s.PendingAcceptance:
            return toActionBtnContent('claimDetails', `/claim/${claim.id}/conversation`);
    }
    throw new Error('Unsupported claim status');
};

export const mapToActionBtnContent = (claim: Observable<Claim>) => (
    s: Observable<boolean>
): Observable<ActionBtnContent> => {
    const realEnvContent = of(toActionBtnContent('details', `/payment-section/env/${routeEnv['1']}/operations`));
    const fromClaimContent = claim.pipe(map(c => claimToActionBtnContent(c)));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, realEnvContent, fromClaimContent)));
};
