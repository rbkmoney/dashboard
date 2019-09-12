import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
    const actionBtnContent$ = hasRealEnv$.pipe(mapToActionBtnContent(basePath, targetClaim$));
    const subheading$ = hasRealEnv$.pipe(mapToSubheading(basePath, targetClaim$));
    const testEnvBtnContent$ = shops.pipe(
        filterTestShops,
        map(negate(isEmpty)),
        mapToTestEnvBtnContent(initialConf.testEnvBtnContent)
    );
    const emitter = new BehaviorSubject<ContentConfig>(initialConf);
    const state = emitter.asObservable();
    applyToSate(state, actionBtnContent$, subheading$, testEnvBtnContent$).subscribe(r => emitter.next(r));
    return state;
};
