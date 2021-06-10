import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable, Subject } from 'rxjs';
import { shareReplay, startWith, switchMapTo } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { ShopsService } from '@dsh/api-codegen/capi/shops.service';

import { SHARE_REPLAY_CONF } from '../../custom-operators';

@Injectable()
export class ApiShopsService {
    private reloadShops$ = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shops$: Observable<Shop[]> = this.reloadShops$.pipe(
        startWith<void, null>(null),
        switchMapTo(this.shopsService.getShops(this.idGenerator.shortUuid())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopsService: ShopsService, private idGenerator: IdGeneratorService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(this.idGenerator.shortUuid(), shopID);
    }

    getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(this.idGenerator.shortUuid());
    }

    reloadShops() {
        this.reloadShops$.next();
    }

    suspendShop(shopID: string) {
        return this.shopsService.suspendShop(this.idGenerator.shortUuid(), shopID);
    }

    activateShop(shopID: string) {
        return this.shopsService.activateShop(this.idGenerator.shortUuid(), shopID);
    }
}
