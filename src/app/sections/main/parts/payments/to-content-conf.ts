import { Observable, combineLatest, of, iif, BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';
import isEqual from 'lodash/isEqual';

import { Shop } from '../../../../api-codegen/capi';
import { Claim, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { ContentConfig, ActionBtnContent, TestEnvBtnContent } from './content-config';
import { filterByProp, booleanDelay } from '../../../../custom-operators';
import { filterQuestionaryClaims, takeTargetClaim } from './operators';
import { ClaimStatus, filterBattleShops, filterTestShops } from '../../../../api';
import { routeEnv } from '../../../route-env';

const basePath = 'sections.main.payments';

const initialConf = {
    subheading: `${basePath}.subheading.prestine`,
    actionBtnContent: {
        actionLabel: `${basePath}.action.details`,
        routerLink: '/',
        disabled: true
    },
    testEnvBtnContent: {
        routerLink: '/',
        disabled: true
    },
    isLoading: false
};

const applyActionContent = (subheadingPath, actionPath, routerLink): ActionBtnContent => ({
    routerLink,
    actionLabel: `${basePath}.action.${actionPath}`,
    disabled: false
});

const applyTestEnvContent = (): TestEnvBtnContent => ({
    routerLink: `/payment-section/env/${routeEnv['0']}/operations`,
    disabled: false
});

const applyClaimToConf = (claim: Claim | null): ActionBtnContent => {
    if (claim === null) {
        return applyActionContent('prestine', 'join', '/onboarding');
    }
    const s = StatusModificationUnit.StatusEnum;
    switch (claim.status) {
        case s.Pending:
            return applyActionContent('onboardingPending', 'continue', `/onboarding/${claim.id}`);
        case s.Review:
            return applyActionContent('onboardingReview', 'claimDetails', `/claim/${claim.id}`);
        case s.PendingAcceptance:
            return applyActionContent('onboardingReviewed', 'claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

const getClaimsConf = (claims: Observable<Claim[]>): Observable<ActionBtnContent> => {
    const questionaryClaims = claims.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const pendingAcceptanceClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.PendingAcceptance));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest(pendingClaims, pendingAcceptanceClaims, reviewClaims).pipe(
        takeTargetClaim,
        map(claim => applyClaimToConf(claim))
    );
};

const getRealEnvConf = (): Observable<ActionBtnContent> =>
    of(applyActionContent('prestine', 'details', `/payment-section/env/${routeEnv['1']}/operations`));

const toActionBtnContent = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ActionBtnContent> => {
    const hasRealEnv = shops.pipe(
        filterBattleShops,
        map(negate(isEmpty))
    );
    return hasRealEnv.pipe(
        switchMap(isReal => iif(() => isReal, getRealEnvConf(), getClaimsConf(claims))),
        shareReplay(1)
    );
};

const toTestEnvBtnContent = (shops: Observable<Shop[]>): Observable<TestEnvBtnContent | null> => {
    const hasTestEnv = shops.pipe(
        filterTestShops,
        map(negate(isEmpty))
    );
    return hasTestEnv.pipe(
        switchMap(isTest => iif(() => isTest, of(applyTestEnvContent()), of(null))),
        shareReplay(1)
    );
};

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const result = new BehaviorSubject<ContentConfig>(initialConf);

    const state$ = result.pipe(distinctUntilChanged((prev, curr) => isEqual(prev, curr)));

    const actionBtnContent$ = toActionBtnContent(shops, claims);
    const testEnvBtnContent$ = toTestEnvBtnContent(shops);
    const isLoading$ = combineLatest(actionBtnContent$, testEnvBtnContent$).pipe(booleanDelay());

    combineLatest(state$, actionBtnContent$)
        .pipe(
            map(([state, actionBtnContent]) => ({
                ...state,
                actionBtnContent
            }))
        )
        .subscribe(c => result.next(c));

    combineLatest(state$, isLoading$)
        .pipe(
            map(([state, isLoading]) => ({
                ...state,
                isLoading
            }))
        )
        .subscribe(c => result.next(c));

    combineLatest(state$, testEnvBtnContent$)
        .pipe(
            map(([state, testEnvBtnContent]) => ({
                ...state,
                testEnvBtnContent: testEnvBtnContent === null ? state.testEnvBtnContent : testEnvBtnContent
            }))
        )
        .subscribe(c => result.next(c));

    return result;
};
