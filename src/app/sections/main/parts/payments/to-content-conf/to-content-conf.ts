import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap, startWith } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { Shop } from '../../../../../api-codegen/capi';
import { Claim } from '../../../../../api-codegen/claim-management';
import { ContentConfig } from '../content-config';
import { filterBattleShops, filterTestShops } from '../../../../../api';
import { mapToSubheading } from './map-to-subheading';
import { mapToActionBtnContent } from './map-to-action-btn-content';
import { mapToTestEnvBtnContent } from './map-to-test-env-btn-content';
import { mapToTargetClaim } from './map-to-target-claim';
import { applyToSate } from './apply-to-state';

const initialConf = {
    subheading: `pristine`,
    actionBtnContent: {
        actionLabel: `details`,
        routerLink: '/',
        disabled: true
    },
    testEnvBtnContent: {
        routerLink: '/',
        disabled: true
    }
};

export const toContentConf = (shops: Observable<Shop[]>, claims: Observable<Claim[]>): Observable<ContentConfig> => {
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
    const state = new BehaviorSubject<ContentConfig>(initialConf);
    return applyToSate(state.asObservable(), actionBtnContent$, subheading$, testEnvBtnContent$).pipe(
        startWith(initialConf),
        tap(r => state.next(r)),
        shareReplay(1)
    );
};
