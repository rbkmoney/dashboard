import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../app/custom-operators';
import { filterByNameAndId, ShopInfo } from '../../../app/sections/payment-section/operations/operators';
import { CustomFormControl } from '../utils';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopSelectorComponent extends CustomFormControl {
    @Input() shopsInfos: ShopInfo[];

    @ViewChild('shopsSelector') clearShopIDsSearchInput: ElementRef;

    filterControl$ = new FormControl();
    filteredShops$: Observable<ShopInfo[]> = this.filterControl$.valueChanges.pipe(
        startWith(this.shopsInfos),
        debounceTime(300),
        switchMap(v => combineLatest([of(v), of(this.shopsInfos)])),
        filterByNameAndId,
        shareReplay(SHARE_REPLAY_CONF)
    );

    resetShopFilter() {
        this.value = [];
    }

    clearShopIDsSearch() {
        this.filterControl$.patchValue('');
    }

    shopsIDsOpenedChange(e) {
        this.filterControl$.patchValue('');
        if (e === true) {
            this.clearShopIDsSearchInput.nativeElement.focus();
        }
    }

    clearShopsSearch(event) {
        event.stopPropagation();
        this.clearShopIDsSearch();
    }

    selectAllShops() {
        this.value = this.shopsInfos.map(s => s.shopID);
    }
}
