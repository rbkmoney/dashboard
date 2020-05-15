import { iif, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RouteEnv } from '../../../../route-envs';
import { TestEnvBtnContent } from '../content-config';

const toTestEnvBtnContent = (): TestEnvBtnContent => ({
    routerLink: `/payment-section/env/${RouteEnv.test}/operations`,
    disabled: false
});

export const mapToTestEnvBtnContent = (defaultContent: TestEnvBtnContent) => (
    s: Observable<boolean>
): Observable<TestEnvBtnContent> =>
    s.pipe(switchMap(isTest => iif(() => isTest, of(toTestEnvBtnContent()), of(defaultContent))));
