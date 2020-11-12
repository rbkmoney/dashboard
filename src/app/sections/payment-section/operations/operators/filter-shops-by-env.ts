import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { filterBattleShops, filterTestShops, PaymentInstitutionRealm } from '../../../../api';
import { Shop } from '../../../../api-codegen/capi';

export const filterShopsByEnv = (shops$: Observable<Shop[]>) => (
    s: Observable<PaymentInstitutionRealm>
): Observable<Shop[]> =>
    s.pipe(
        switchMap((paymentInstitutionRealm) => {
            switch (paymentInstitutionRealm) {
                case PaymentInstitutionRealm.test:
                    return shops$.pipe(filterTestShops);
                case PaymentInstitutionRealm.live:
                    return shops$.pipe(filterBattleShops);
                default:
                    return throwError(`Unknown PaymentInstitutionRealm: ${paymentInstitutionRealm}`);
            }
        })
    );
