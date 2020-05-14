import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, pluck, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../app/custom-operators';
import { filterByNameAndId, ShopInfo } from '../../../app/sections/payment-section/operations/operators';
import { routeEnv } from '../../../app/sections/route-env';
import { CustomFormControl } from '../utils';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopSelectorComponent extends CustomFormControl implements OnInit {
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

    constructor(focusMonitor: FocusMonitor,
                elementRef: ElementRef<HTMLElement>,
                platform: Platform,
                @Optional() @Self() ngControl: NgControl,
                autofillMonitor: AutofillMonitor,
                defaultErrorStateMatcher: ErrorStateMatcher,
                @Optional() parentForm: NgForm,
                @Optional() parentFormGroup: FormGroupDirective,
                private route: ActivatedRoute) {
        super(focusMonitor, elementRef, platform, ngControl, autofillMonitor, defaultErrorStateMatcher, parentForm, parentFormGroup);
    }

    ngOnInit(): void {
        this.route.params.pipe(
            take(1),
            pluck('envID')
        ).subscribe(env => {
            if (env === routeEnv[0]) {
                this.value = ['TEST'];
                this.setDisabledState(true);
            }
        });
    }

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
