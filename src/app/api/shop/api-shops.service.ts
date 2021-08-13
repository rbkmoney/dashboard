import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, switchMapTo } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { ShopsService } from '@dsh/api-codegen/capi/shops.service';
import { shareReplayRefCount } from '@dsh/operators';

@Injectable()
export class ApiShopsService {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith<void, null>(null),
        switchMapTo(this.getShops()),
        shareReplayRefCount()
    );

    private reloadShops$ = new Subject<void>();

    constructor(private shopsService: ShopsService, private idGenerator: IdGeneratorService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(this.idGenerator.shortUuid(), shopID);
    }

    getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(this.idGenerator.shortUuid());
    }

    reloadShops(): void {
        this.reloadShops$.next();
    }

    suspendShop(shopID: string): Observable<void> {
        return this.shopsService.suspendShop(this.idGenerator.shortUuid(), shopID);
    }

    activateShop(shopID: string): Observable<void> {
        return this.shopsService.activateShop(this.idGenerator.shortUuid(), shopID);
    }
}
