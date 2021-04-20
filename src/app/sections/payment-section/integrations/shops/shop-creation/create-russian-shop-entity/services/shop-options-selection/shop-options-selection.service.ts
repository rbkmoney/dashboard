import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { SHARE_REPLAY_CONF } from '../../../../../../../../custom-operators';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';

@UntilDestroy()
@Injectable()
export class ShopOptionsSelectionService {
    control = new FormControl();
    options$: Observable<BaseOption<string>[]>;
    selectedShop$: Observable<Shop | null>;

    private innerSelectedShop$ = new ReplaySubject<Shop>(1);

    constructor(private shopsService: FetchShopsService) {
        this.initShopOptions();
        this.initSelectedShop();
    }

    private initShopOptions(): void {
        this.options$ = this.shopsService.allShops$.pipe(
            map((shopsList: Shop[]) => {
                return shopsList.map((shop: Shop) => {
                    return {
                        id: shop.id,
                        label: shop.details.name,
                    };
                });
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private initSelectedShop(): void {
        this.control.valueChanges
            .pipe(
                withLatestFrom(this.shopsService.allShops$),
                map(([selected, shopsList]: [BaseOption<string> | null, Shop[]]) => {
                    if (isNil(selected)) {
                        return null;
                    }
                    return shopsList.find((shop: Shop) => shop.id === selected.id);
                }),
                map((shop: Shop | undefined | null) => (isNil(shop) ? null : shop)),
                shareReplay(SHARE_REPLAY_CONF),
                untilDestroyed(this)
            )
            .subscribe((selectedShop: Shop | null) => {
                this.innerSelectedShop$.next(selectedShop);
            });

        this.selectedShop$ = this.innerSelectedShop$.asObservable();
    }
}
