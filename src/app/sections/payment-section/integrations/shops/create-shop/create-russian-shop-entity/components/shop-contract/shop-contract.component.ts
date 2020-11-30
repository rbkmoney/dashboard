import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { Shop } from '../../../../../../../../api-codegen/anapi/swagger-codegen';
import { Contract } from '../../../../../../../../api-codegen/capi/swagger-codegen';
import { FetchShopsService } from '../../../../services/fetch-shops/fetch-shops.service';
import { ShopContractDetailsService } from '../../../../services/shop-contract-details/shop-contract-details.service';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-contract',
    templateUrl: './shop-contract.component.html',
    providers: [ShopContractDetailsService],
})
export class ShopContractComponent implements OnInit {
    @Input() form: FormGroup = new FormGroup({
        shop: new FormControl(),
    });

    shopsOptions$: Observable<BaseOption<string>[]> = this.shopsService.allShops$.pipe(
        map((shopsList: Shop[]) => {
            return shopsList.map((shop: Shop) => {
                return {
                    id: shop.id,
                    label: shop.details.name,
                };
            });
        })
    );

    contractor$: Observable<Contract> = this.contractService.shopContract$;

    constructor(private shopsService: FetchShopsService, private contractService: ShopContractDetailsService) {}

    get shopControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('shop'))) {
            throw new Error(`Can't find shop control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('shop') as FormControl;
    }

    ngOnInit(): void {
        this.shopControl.valueChanges
            .pipe(
                withLatestFrom(this.shopsService.allShops$),
                map(([selected, shopsList]: [BaseOption<string>, Shop[]]) => {
                    return shopsList.find((shop: Shop) => shop.id === selected.id);
                }),
                filter(Boolean),
                map((shop: Shop) => shop.contractID),
                untilDestroyed(this)
            )
            .subscribe((contractID: string) => {
                this.contractService.getContract(contractID);
            });
    }
}
