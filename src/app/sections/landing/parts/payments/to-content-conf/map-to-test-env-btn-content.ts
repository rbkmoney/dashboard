import { iif, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';

import { TestEnvBtnContent } from '../content-config';

const toTestEnvBtnContent = (): TestEnvBtnContent => ({
    routerLink: `/payment-section/realm/${PaymentInstitutionRealm.Test}/analytics`,
    disabled: false,
});

export const mapToTestEnvBtnContent =
    (defaultContent: TestEnvBtnContent) =>
    (s: Observable<boolean>): Observable<TestEnvBtnContent> =>
        s.pipe(switchMap((isTest) => iif(() => isTest, of(toTestEnvBtnContent()), of(defaultContent))));
