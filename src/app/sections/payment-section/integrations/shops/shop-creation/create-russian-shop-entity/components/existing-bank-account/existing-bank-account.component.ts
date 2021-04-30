import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { PayoutTool, Shop } from '@dsh/api-codegen/capi';
import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { BANK_SHOP_ID_FIELD } from '../../consts';
import { ShopOptionsSelectionService } from '../../services/shop-options-selection/shop-options-selection.service';

@UntilDestroy()
@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: 'existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopOptionsSelectionService],
})
export class ExistingBankAccountComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() payoutTool: PayoutTool;
    @Input() isLoading: boolean;
    @Input() hasError: boolean;
    @Input() contentWindow: HTMLElement;

    shopsList$: Observable<BaseOption<string>[]> = this.shopOptionsService.options$;
    innerShopControl: FormControl = this.shopOptionsService.control;

    private get shopControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get(BANK_SHOP_ID_FIELD))) {
            throw new Error(`Can't find shop control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get(BANK_SHOP_ID_FIELD) as FormControl;
    }

    constructor(private shopOptionsService: ShopOptionsSelectionService) {}

    ngOnInit(): void {
        const formShopId = this.shopControl.value as string | undefined;
        this.shopsList$
            .pipe(
                map((shops: BaseOption<string>[]) => {
                    return shops.find(({ id }: BaseOption<string>) => id === formShopId);
                }),
                take(1),
                filter(Boolean)
            )
            .subscribe((shop: BaseOption<string>) => {
                this.innerShopControl.setValue(shop);
            });

        this.shopOptionsService.selectedShop$
            .pipe(
                map((shop: Shop | null) => (isNil(shop) ? '' : shop.id)),
                untilDestroyed(this)
            )
            .subscribe((shopID: string) => {
                this.shopControl.setValue(shopID);
            });
    }
}
