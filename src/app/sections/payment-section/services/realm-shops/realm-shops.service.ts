import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { shareReplayRefCount } from '@dsh/operators';

import { getShopsByRealm } from '../../operations/operators';
import { PaymentInstitutionRealmService } from '../payment-institution-realm/payment-institution-realm.service';

@Injectable()
export class RealmShopsService {
    shops$: Observable<Shop[]> = combineLatest([this.shopsService.shops$, this.realmService.realm$]).pipe(
        map(([shops, realm]) => getShopsByRealm(shops, realm)),
        shareReplayRefCount()
    );

    constructor(private shopsService: ApiShopsService, private realmService: PaymentInstitutionRealmService) {}
}
