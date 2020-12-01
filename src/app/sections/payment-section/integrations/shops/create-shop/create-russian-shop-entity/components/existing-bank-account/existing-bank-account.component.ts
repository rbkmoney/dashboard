import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseOption } from '@dsh/app/shared/components/selects/autocomplete-virtual-scroll/types/base-option';

import { PayoutTool, Shop } from '../../../../../../../../api-codegen/capi';
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
    @Input() contentWindow: HTMLElement;

    shopsList$: Observable<BaseOption<string>[]> = this.shopOptionsService.options$;
    innerShopControl: FormControl = this.shopOptionsService.control;

    private get shopControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('bankShopID'))) {
            throw new Error(`Can't find shop control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('bankShopID') as FormControl;
    }

    constructor(private shopOptionsService: ShopOptionsSelectionService) {}

    ngOnInit(): void {
        this.shopOptionsService.selectedValue$
            .pipe(
                map((shop: Shop) => shop.id),
                untilDestroyed(this)
            )
            .subscribe((shopID: string) => {
                this.shopControl.setValue(shopID);
            });
    }
}
