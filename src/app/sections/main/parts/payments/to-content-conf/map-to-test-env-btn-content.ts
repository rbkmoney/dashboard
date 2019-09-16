import { Observable, iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TestEnvBtnContent } from '../content-config';
import { routeEnv } from '../../../../route-env';

const toTestEnvBtnContent = (): TestEnvBtnContent => ({
    routerLink: `/payment-section/env/${routeEnv['0']}/operations`,
    disabled: false
});

export const mapToTestEnvBtnContent = (defaultContent: TestEnvBtnContent) => (
    s: Observable<boolean>
): Observable<TestEnvBtnContent> =>
    s.pipe(switchMap(isTest => iif(() => isTest, of(toTestEnvBtnContent()), of(defaultContent))));
