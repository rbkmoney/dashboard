import last from 'lodash.last';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Claim, ClaimChangeset, StatusModificationUnit } from '../../../../../api-codegen/claim-management';
import { takeDocumentModificationUnits } from '../../../../../api/claims/utils';
import { routeEnv } from '../../../../route-env';
import { ActionBtnContent } from '../content-config';

const toActionBtnContent = (actionLabel: string, routerLink: string): ActionBtnContent => ({
    routerLink,
    actionLabel,
    disabled: false
});

const getDocumentID = (changeset: ClaimChangeset) => last(takeDocumentModificationUnits(changeset)).documentId;

const claimToActionBtnContent = (claim: Claim | null): ActionBtnContent => {
    if (claim === null) {
        return toActionBtnContent('join', '/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return toActionBtnContent(
                'continue',
                `/onboarding/claim/${claim.id}/document/${getDocumentID(claim.changeset)}/step/basic-info`
            );
        case s.Review:
            return toActionBtnContent('claimDetails', `/claim/${claim.id}/conversation`);
    }
    throw new Error('Unsupported claim status');
};

export const mapToActionBtnContent = (claim: Observable<Claim>) => (
    s: Observable<boolean>
): Observable<ActionBtnContent> => {
    const realEnvContent = of(toActionBtnContent('details', `/payment-section/env/${routeEnv['1']}/operations`));
    const fromClaimContent = claim.pipe(map(claimToActionBtnContent));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, realEnvContent, fromClaimContent)));
};
