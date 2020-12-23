import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { filterShopsByRealm } from '../../../../../operators';

@UntilDestroy()
@Injectable()
export class ShopsSelectionManagerService {
    shops$: Observable<Shop[]>;
    selectedShops$: Observable<Shop[]>;

    private realmChanges$ = new ReplaySubject<PaymentInstitutionRealm>(1);
    private selectedIds$ = new ReplaySubject<string[]>(1);

    constructor(private shopService: ApiShopsService) {
        this.initShops();
        this.initShopsSelection();
    }

    setRealm(realm: PaymentInstitutionRealm): void {
        this.realmChanges$.next(realm);
    }

    setSelectedIds(selectedIds: string[]): void {
        this.selectedIds$.next(selectedIds);
    }

    private initShops(): void {
        this.shops$ = this.realmChanges$.pipe(filterShopsByRealm(this.shopService.shops$));
    }

    private initShopsSelection(): void {
        this.selectedShops$ = this.selectedIds$.pipe(
            map((selectedIds: string[]) => {
                return selectedIds.reduce((idsMap: Map<string, string>, id: string) => {
                    idsMap.set(id, id);
                    return idsMap;
                }, new Map<string, string>());
            }),
            mergeMap((selectedIds: Map<string, string>) => {
                return this.shops$.pipe(map((shops: Shop[]) => [selectedIds, shops]));
            }),
            map(([selectedIds, shops]: [Map<string, string>, Shop[]]) => {
                return shops.map((shop: Shop) => (selectedIds.has(shop.id) ? shop : null)).filter(Boolean);
            })
        );
    }
}
