import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../app/custom-operators';
import { ShopInfo, filterByNameAndId } from '../../../app/sections/payment-section/operations/operators';
import { CustomFormControl } from '../utils';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopSelectorComponent extends CustomFormControl {
    @Input() shopsInfo: ShopInfo[];

    @ViewChild('shopsSelector') clearShopIDsSearchInput: ElementRef;

    filterControl$ = new FormControl();
    filteredShops$: Observable<ShopInfo[]> = this.filterControl$.valueChanges.pipe(
        startWith(this.shopsInfo),
        debounceTime(300),
        switchMap(v => combineLatest([of(v), of(this.shopsInfo)])),
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
}
