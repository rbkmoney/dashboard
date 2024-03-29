import { iif, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Claim, ClaimChangeset, StatusModificationUnit } from '@dsh/api-codegen/claim-management';
import { takeDocumentModificationUnits } from '@dsh/api/claims/utils';
import { PaymentInstitutionRealm } from '@dsh/api/model';

import { ActionBtnContent } from '../content-config';

const toActionBtnContent = (actionLabel: string, routerLink: string): ActionBtnContent => ({
    routerLink,
    actionLabel,
    disabled: false,
});

const getDocumentId = (changeset: ClaimChangeset) => {
    const arr = takeDocumentModificationUnits(changeset);
    return arr[arr.length - 1].documentId;
};

const claimToActionBtnContent = (claim: Claim | null): ActionBtnContent => {
    if (claim === null) {
        return toActionBtnContent('join', '/claim-section/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return toActionBtnContent(
                'continue',
                `/claim-section/onboarding/claim/${claim.id}/document/${getDocumentId(claim.changeset)}/step/basic-info`
            );
        case s.Review:
            return toActionBtnContent('claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

export const mapToActionBtnContent =
    (claim: Observable<Claim>) =>
    (s: Observable<boolean>): Observable<ActionBtnContent> => {
        const realEnvContent = of(
            toActionBtnContent('details', `/payment-section/realm/${PaymentInstitutionRealm.Live}/analytics`)
        );
        const fromClaimContent = claim.pipe(map(claimToActionBtnContent));
        return s.pipe(switchMap((isRealEnv) => iif(() => isRealEnv, realEnvContent, fromClaimContent)));
    };
