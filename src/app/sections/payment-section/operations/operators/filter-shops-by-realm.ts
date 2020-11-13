import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PaymentInstitutionRealm, toLiveShops, toTestShops } from '../../../../api';
import { Shop } from '../../../../api-codegen/capi';

export const filterShopsByRealm = (shops$: Observable<Shop[]>) => (
    s: Observable<PaymentInstitutionRealm>
): Observable<Shop[]> =>
    s.pipe(
        switchMap((realm) => {
            switch (realm) {
                case PaymentInstitutionRealm.test:
                    return shops$.pipe(map(toTestShops));
                case PaymentInstitutionRealm.live:
                    return shops$.pipe(map(toLiveShops));
                default:
                    return throwError(`Unknown PaymentInstitutionRealm: ${realm}`);
            }
        })
    );
