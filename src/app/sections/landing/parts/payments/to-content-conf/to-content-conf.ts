import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { Claim } from '@dsh/api-codegen/claim-management';
import { toLiveShops, toTestShops } from '@dsh/api/shop';

import { ContentConfig } from '../content-config';
import { applyToSate } from './apply-to-state';
import { mapToActionBtnContent } from './map-to-action-btn-content';
import { mapToSubheading } from './map-to-subheading';
import { mapToTargetClaim } from './map-to-target-claim';
import { mapToTestEnvBtnContent } from './map-to-test-env-btn-content';

const INITIAL_CONF = {
    subheading: `pristine`,
    actionBtnContent: {
        actionLabel: `details`,
        routerLink: '/',
        disabled: true,
    },
    testEnvBtnContent: {
        routerLink: '/',
        disabled: true,
    },
};

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
    const hasRealEnv$ = shops.pipe(map(toLiveShops), map(negate(isEmpty)), shareReplay(1));
    const targetClaim$ = claims.pipe(mapToTargetClaim, shareReplay(1));
    const actionBtnContent$ = hasRealEnv$.pipe(mapToActionBtnContent(targetClaim$));
    const subheading$ = hasRealEnv$.pipe(mapToSubheading(targetClaim$));
    const testEnvBtnContent$ = shops.pipe(
        map(toTestShops),
        map(negate(isEmpty)),
        mapToTestEnvBtnContent(INITIAL_CONF.testEnvBtnContent)
    );
    const state = new BehaviorSubject<ContentConfig>(INITIAL_CONF);
    return applyToSate(state.asObservable(), actionBtnContent$, subheading$, testEnvBtnContent$).pipe(
        startWith(INITIAL_CONF),
        tap((r) => state.next(r)),
        shareReplay(1)
    );
};
