import { Observable, combineLatest, of, iif, BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, map, tap, take } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { Shop } from '../../../../api-codegen/capi';
import { Claim, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { ContentConfig } from './content-config';
import { filterByProp, booleanDelay } from '../../../../custom-operators';
import { filterQuestionaryClaims, takeTargetClaim } from './operators';
import { ClaimStatus, filterBattleShops, filterTestShops } from '../../../../api';
import { routeEnv } from '../../../route-env';

const basePath = 'sections.main.payments';

const defaultContentConfig = {
    subheading: `${basePath}.subheading.prestine`,
    actionBtnContent: {
        actionLabel: `${basePath}.action.details`,
        routerLink: '/',
        disabled: true
    },
    testEnvBtnContent: {
        routerLink: `/payment-section/env/${routeEnv['0']}/operations`,
        disabled: true
    },
    isLoading: false
};

const applyActionContent = (s: ContentConfig, subheadingPath, actionPath, routerLink): ContentConfig => ({
    ...s,
    subheading: `${basePath}.subheading.${subheadingPath}`,
    actionBtnContent: {
        ...s.actionBtnContent,
        routerLink,
        actionLabel: `${basePath}.action.${actionPath}`,
        disabled: false
    }
});

const applyTestEnvContent = (s: ContentConfig): ContentConfig => ({
    ...s,
    testEnvBtnContent: {
        ...s.testEnvBtnContent,
        disabled: false
    }
});

const applyClaimToConf = (c: ContentConfig, claim: Claim | null): ContentConfig => {
    if (claim === null) {
        return applyActionContent(c, 'prestine', 'join', '/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return applyActionContent(c, 'onboardingPending', 'continue', `/onboarding/${claim.id}`);
        case s.Review:
            return applyActionContent(c, 'onboardingReview', 'claimDetails', `/claim/${claim.id}`);
        case s.PendingAcceptance:
            return applyActionContent(c, 'onboardingReviewed', 'claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

const getClaimsConf = (c: ContentConfig, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const questionaryClaims = claims.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const pendingAcceptanceClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.PendingAcceptance));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest(pendingClaims, pendingAcceptanceClaims, reviewClaims).pipe(
        takeTargetClaim,
        map(claim => applyClaimToConf(c, claim)),
        shareReplay(1)
    );
};

const getRealEnvConf = (c: ContentConfig): Observable<ContentConfig> =>
    of(applyActionContent(c, 'prestine', 'details', `/payment-section/env/${routeEnv['1']}/operations`));

const getActionConf = (
    c: ContentConfig,
    shops: Observable<Shop[]>,
    claims: Observable<Claim[]>
): Observable<ContentConfig> => {
    const hasRealEnv = shops.pipe(
        filterBattleShops,
        map(negate(isEmpty))
    );
    const realEnvConf = getRealEnvConf(c);
    const confFromClaims = getClaimsConf(c, claims);
    return hasRealEnv.pipe(
        switchMap(isReal => iif(() => isReal, realEnvConf, confFromClaims)),
        shareReplay(1)
    );
};

const getTestEnvConf = (c: ContentConfig, shops: Observable<Shop[]>): Observable<ContentConfig> => {
    const hasTestEnv = shops.pipe(
        filterTestShops,
        map(negate(isEmpty))
    );
    const defaultConf = of(c); // TODO should create test shop hire
    const enabledTestConf = defaultConf.pipe(map(applyTestEnvContent));
    return hasTestEnv.pipe(
        switchMap(isTest => iif(() => isTest, enabledTestConf, defaultConf)),
        shareReplay(1)
    );
};

const applyIsLoading = (s: ContentConfig, isLoading: boolean): Observable<ContentConfig> =>
    of({
        ...s,
        isLoading
    });

const applyToState = (
    state: Observable<ContentConfig>,
    action: (state: ContentConfig, ...args: any[]) => Observable<ContentConfig>
) => (s: Observable<any>) =>
    s.pipe(
        switchMap(() => combineLatest(state, s).pipe(take(1))),
        switchMap(([c, args]) => action(c, args))
    );

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const result = new BehaviorSubject<ContentConfig>(defaultContentConfig);
    const actionConfig = getActionConf(result.value, shops, claims);

    const testEnvConfig = getTestEnvConf(result.value, shops);

    actionConfig
        .pipe(
            booleanDelay(),
            applyToState(result, applyIsLoading)
        )
        .subscribe(c => result.next(c));
    actionConfig.subscribe(c => result.next(c));
    testEnvConfig.subscribe(c => result.next(c));
    return result;
};
