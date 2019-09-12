import { Observable, of, iif } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Claim, StatusModificationUnit } from '../../../../../api-codegen/claim-management';
import { routeEnv } from '../../../../route-env';
import { ActionBtnContent } from '../content-config';

const toActionBtnContent = (p, actionPath, routerLink): ActionBtnContent => ({
    routerLink,
    actionLabel: `${p}.action.${actionPath}`,
    disabled: false
});

const claimToActionBtnContent = (path: string, claim: Claim | null): ActionBtnContent => {
    if (claim === null) {
        return toActionBtnContent(path, 'join', '/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return toActionBtnContent(path, 'continue', `/onboarding/${claim.id}`);
        case s.Review:
            return toActionBtnContent(path, 'claimDetails', `/claim/${claim.id}`);
        case s.PendingAcceptance:
            return toActionBtnContent(path, 'claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

export const mapToActionBtnContent = (basePath: string, claim: Observable<Claim>) => (
    s: Observable<boolean>
): Observable<ActionBtnContent> => {
    const realEnvContent = of(
        toActionBtnContent(basePath, 'details', `/payment-section/env/${routeEnv['1']}/operations`)
    );
    const fromClaimContent = claim.pipe(map(c => claimToActionBtnContent(basePath, c)));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, realEnvContent, fromClaimContent)));
};
