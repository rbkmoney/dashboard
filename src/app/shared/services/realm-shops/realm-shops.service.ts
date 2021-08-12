import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { shareReplayRefCount } from '@dsh/operators';

import { getShopsByRealm } from '../../../sections/payment-section/operations/operators';
import { PAYMENT_INSTITUTION_REALM_TOKEN, PaymentInstitutionRealmToken } from './payment-institution-realm-token';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = combineLatest(this.shopsService.shops$, this.realm$).pipe(
        map(([shops, realm]) => getShopsByRealm(shops, realm)),
        shareReplayRefCount()
    );

    constructor(
        private shopsService: ApiShopsService,
        @Inject(PAYMENT_INSTITUTION_REALM_TOKEN)
        @Optional()
        private realm$: PaymentInstitutionRealmToken = of(RealmEnum.Live)
    ) {}
}
