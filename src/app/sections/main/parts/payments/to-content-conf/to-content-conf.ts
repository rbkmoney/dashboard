import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';

import { toLiveShops, toTestShops } from '../../../../../api';
import { Shop } from '../../../../../api-codegen/capi';
import { Claim } from '../../../../../api-codegen/claim-management';
import { ContentConfig } from '../content-config';
import { applyToSate } from './apply-to-state';
import { mapToActionBtnContent } from './map-to-action-btn-content';
import { mapToSubheading } from './map-to-subheading';
import { mapToTargetClaim } from './map-to-target-claim';
import { mapToTestEnvBtnContent } from './map-to-test-env-btn-content';

const initialConf = {
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
        mapToTestEnvBtnContent(initialConf.testEnvBtnContent)
    );
    const state = new BehaviorSubject<ContentConfig>(initialConf);
    return applyToSate(state.asObservable(), actionBtnContent$, subheading$, testEnvBtnContent$).pipe(
        startWith(initialConf),
        tap((r) => state.next(r)),
        shareReplay(1)
    );
};
