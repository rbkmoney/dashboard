import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, ElementRef, OnChanges, Optional, Self, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';
import { CustomFormControl } from '@dsh/components/form-controls/utils';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { filterShopsByRealm, mapToShopInfo, ShopInfo } from '../payment-section/operations/operators';
import { filterByNameAndId } from './filter-shop-infos-by-name-and-id';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSelectorComponent extends CustomFormControl implements OnChanges {
    private shopInfos$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(1)
    );

    @ViewChild('shopsSelector') clearShopIDsSearchInput: ElementRef;

    filterControl = new FormControl();
    filteredShops$: Observable<ShopInfo[]> = this.filterControl.valueChanges.pipe(
        startWith(''),
        switchMap((v) => combineLatest([of(v), this.shopInfos$])),
        debounceTime(300),
        map(([v, s]) => filterByNameAndId(v, s)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    selectLabel = this.route.params.pipe(
        pluck('realm'),
        map((e) => e === PaymentInstitutionRealm.Test)
    );

    constructor(
        focusMonitor: FocusMonitor,
        elementRef: ElementRef<HTMLElement>,
        platform: Platform,
        @Optional() @Self() ngControl: NgControl,
        autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective,
        private route: ActivatedRoute,
        private shopService: ApiShopsService
    ) {
        super(
            focusMonitor,
            elementRef,
            platform,
            ngControl,
            autofillMonitor,
            defaultErrorStateMatcher,
            parentForm,
            parentFormGroup
        );
    }

    resetShopFilter() {
        this.value = [];
    }

    clearShopIDsSearch() {
        this.filterControl.patchValue('');
    }

    shopsIDsOpenedChange(e) {
        this.filterControl.patchValue('');
        if (e === true) {
            this.clearShopIDsSearchInput.nativeElement.focus();
        }
    }

    clearShopsSearch(event) {
        event.stopPropagation();
        this.clearShopIDsSearch();
    }
}
