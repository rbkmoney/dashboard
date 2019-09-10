import { Observable, combineLatest, of, iif } from 'rxjs';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { Shop } from '../../../../api-codegen/capi';
import { Claim, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { ContentConfig } from './content-config';
import { filterByProp } from '../../../../custom-operators';
import { filterQuestionaryClaims, takeTargetClaim } from './operators';
import { ClaimStatus, filterBattleShops } from '../../../../api';
import { routeEnv } from '../../../route-env';

const mapSubheading = (basePath, path) => `${basePath}.subheading.${path}`;

const mapAction = (basePath, path) => `${basePath}.action.${path}`;

const contentConf = (subheadingPath, actionPath, routerLink, basePath = 'sections.main.payments') => ({
    subheading: mapSubheading(basePath, subheadingPath),
    action: mapAction(basePath, actionPath),
    routerLink
});

const claimToContentConf = (claim: Claim | null): ContentConfig => {
    if (claim === null) {
        return contentConf('prestine', 'join', '/onboarding');
    }
    const status = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case status.Pending:
            return contentConf('onboardingPending', 'continue', '/onboarding');
        case status.Review:
            return contentConf('onboardingReview', 'claimDetails', `/claim/${claim.id}`);
        case status.PendingAcceptance:
            return contentConf('onboardingReviewed', 'claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

const claimsToConf = (claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const questionaryClaims = claims.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const pendingAcceptanceClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.PendingAcceptance));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest(pendingClaims, pendingAcceptanceClaims, reviewClaims).pipe(
        takeTargetClaim,
        map(claimToContentConf),
        shareReplay(1)
    );
};

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const hasRealEnv = shops.pipe(
        filterBattleShops,
        map(negate(isEmpty))
    );
    const realEnvConf = of(contentConf('prestine', 'details', `/payment-section/env/${routeEnv['1']}/operations`));
    const confFromClaims = claimsToConf(claims);
    return hasRealEnv.pipe(switchMap(isReal => iif(() => isReal, realEnvConf, confFromClaims)));
};
