import { Observable, combineLatest, of, iif, BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';
import isEqual from 'lodash/isEqual';

import { Shop } from '../../../../api-codegen/capi';
import { Claim, StatusModificationUnit } from '../../../../api-codegen/claim-management';
import { ContentConfig, ActionBtnContent, TestEnvBtnContent } from './content-config';
import { filterByProp } from '../../../../custom-operators';
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
    }
};

const toActionBtnContent = (actionPath, routerLink): ActionBtnContent => ({
    routerLink,
    actionLabel: `${basePath}.action.${actionPath}`,
    disabled: false
});

const toTestEnvBtnContent = (): TestEnvBtnContent => ({
    routerLink: `/payment-section/env/${routeEnv['0']}/operations`,
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
            return toActionBtnContent('claimDetails', `/claim/${claim.id}`);
        case s.PendingAcceptance:
            return toActionBtnContent('claimDetails', `/claim/${claim.id}`);
    }
    throw new Error('Unsupported claim status');
};

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

const mapToTargetClaim = (s: Observable<Claim[]>): Observable<Claim> => {
    const questionaryClaims = s.pipe(filterQuestionaryClaims);
    const pendingClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Pending));
    const pendingAcceptanceClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.PendingAcceptance));
    const reviewClaims = questionaryClaims.pipe(filterByProp('status', ClaimStatus.Review));
    return combineLatest(pendingClaims, pendingAcceptanceClaims, reviewClaims).pipe(takeTargetClaim);
};

const mapToTestEnvBtnContent = (defaultContent: TestEnvBtnContent) => (
    s: Observable<boolean>
): Observable<TestEnvBtnContent> => {
    return s.pipe(switchMap(isTest => iif(() => isTest, of(toTestEnvBtnContent()), of(defaultContent))));
};

const mapToActionBtnContent = (claim: Observable<Claim>) => (s: Observable<boolean>): Observable<ActionBtnContent> => {
    const realEnvContent = of(toActionBtnContent('details', `/payment-section/env/${routeEnv['1']}/operations`));
    const fromClaimContent = claim.pipe(map(c => claimToActionBtnContent(c)));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, realEnvContent, fromClaimContent)));
};

const mapToSubheading = (claim: Observable<Claim>) => (s: Observable<boolean>): Observable<string> => {
    const p = `${basePath}.subheading`;
    const fromClaimContent = claim.pipe(map(c => claimToSubheading(p, c)));
    return s.pipe(switchMap(isRealEnv => iif(() => isRealEnv, of(`${p}.prestine`), fromClaimContent)));
};

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const result = new BehaviorSubject<ContentConfig>(initialConf);
    const hasRealEnv$ = shops.pipe(
        filterBattleShops,
        map(negate(isEmpty)),
        shareReplay(1)
    );
    const targetClaim$ = claims.pipe(
        mapToTargetClaim,
        shareReplay(1)
    );
    const actionBtnContent$ = hasRealEnv$.pipe(mapToActionBtnContent(targetClaim$));
    const subheading$ = hasRealEnv$.pipe(mapToSubheading(targetClaim$));
    const testEnvBtnContent$ = shops.pipe(
        filterTestShops,
        map(negate(isEmpty)),
        mapToTestEnvBtnContent(initialConf.testEnvBtnContent)
    );

    const state$ = result.pipe(distinctUntilChanged((prev, curr) => isEqual(prev, curr)));
    combineLatest(state$, actionBtnContent$)
        .pipe(
            map(([state, actionBtnContent]) => ({
                ...state,
                actionBtnContent
            }))
        )
        .subscribe(c => result.next(c));

    combineLatest(state$, subheading$)
        .pipe(
            map(([state, subheading]) => ({
                ...state,
                subheading
            }))
        )
        .subscribe(c => result.next(c));

    combineLatest(state$, testEnvBtnContent$)
        .pipe(
            map(([state, testEnvBtnContent]) => ({
                ...state,
                testEnvBtnContent
            }))
        )
        .subscribe(c => result.next(c));

    return result;
};
