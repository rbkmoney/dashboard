import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { toLiveShops, toTestShops } from '@dsh/api/shop';

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
