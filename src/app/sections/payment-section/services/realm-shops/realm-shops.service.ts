import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { publishReplayRefCount } from '@dsh/operators';

import { getShopsByRealm } from '../../operations/operators';
import { PAYMENT_INSTITUTION_REALM_TOKEN } from './payment-institution-realm-token';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = this.shopsService.shops$.pipe(
        map((shops) => getShopsByRealm(shops, this.realm)),
        publishReplayRefCount()
    );

    constructor(
        private shopsService: ApiShopsService,
        @Inject(PAYMENT_INSTITUTION_REALM_TOKEN) private realm: RealmEnum
    ) {}
}
