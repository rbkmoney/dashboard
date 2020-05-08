import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { CustomFormControl } from '@dsh/components/form-controls';

import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { ShopInfo } from '../operators';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopSelectorComponent extends CustomFormControl implements OnChanges {
    @Input() shopsInfo: ShopInfo[];

    @ViewChild('shopsSelector') clearShopIDsSearchInput: ElementRef;

    private shopInfos$: BehaviorSubject<ShopInfo[]> = new BehaviorSubject([]);
    filterControl$ = new FormControl();
    filteredShops$: Observable<ShopInfo[]> = this.filterControl$.valueChanges.pipe(
        startWith(this.shopInfos$.value),
        debounceTime(300),
        switchMap(v => combineLatest([of(v), this.shopInfos$])),
        map(([v, shops]) => shops.filter(s => (v ? (s.name + s.shopID).toLowerCase().includes(v) : true))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    resetShopFilter() {
        this.value = [];
    }

    clearShopIDsSearch() {
        this.filterControl$.patchValue('');
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { shopsInfo } = changes;
        if (shopsInfo.currentValue) {
            this.shopInfos$.next(shopsInfo.currentValue);
        }
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
