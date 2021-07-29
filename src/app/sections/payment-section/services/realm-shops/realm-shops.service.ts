import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { publishReplayRefCount } from '@dsh/operators';

import { getShopsByRealm } from '../../operations/operators';
import { PaymentInstitutionRealmService } from '../payment-institution-realm/payment-institution-realm.service';

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = combineLatest(this.realmService.realm$, this.shopsService.shops$).pipe(
        map(([realm, shops]) => getShopsByRealm(shops, realm)),
        publishReplayRefCount()
    );

    constructor(private shopsService: ApiShopsService, private realmService: PaymentInstitutionRealmService) {}
}
