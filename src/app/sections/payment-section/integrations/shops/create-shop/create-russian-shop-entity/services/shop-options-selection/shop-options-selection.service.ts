import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { Shop } from '../../../../../../../../api-codegen/capi';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';

@UntilDestroy()
@Injectable()
export class ShopOptionsSelectionService {
    control = new FormControl();
    options$: Observable<BaseOption<string>[]>;
    selectedValue$: Observable<Shop>;

    constructor(private shopsService: FetchShopsService) {
        this.initShopOptions();
        this.initSelectedValue();
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
            })
        );
    }

    private initSelectedValue(): void {
        this.selectedValue$ = this.control.valueChanges.pipe(
            withLatestFrom(this.shopsService.allShops$),
            map(([selected, shopsList]: [BaseOption<string>, Shop[]]) => {
                return shopsList.find((shop: Shop) => shop.id === selected.id);
            }),
            filter(Boolean),
            map((shop: Shop) => shop),
            untilDestroyed(this)
        );
    }
}
