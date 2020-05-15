import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map, pluck, shareReplay, startWith } from 'rxjs/operators';

import { CustomFormControl } from '@dsh/components/form-controls/utils';

import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { RouteEnv } from '../../../route-env';
import { ShopInfo } from '../operators';
import { filterByNameAndId } from './filter-shop-infos-by-name-and-id';

@Component({
    selector: 'dsh-shop-selector',
    templateUrl: 'shop-selector.component.html',
    styleUrls: ['shop-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopSelectorComponent extends CustomFormControl implements OnChanges {
    @Input() shopInfos: ShopInfo[];

    @ViewChild('shopsSelector') clearShopIDsSearchInput: ElementRef;

    filterControl = new FormControl();
    filteredShops$: Observable<ShopInfo[]> = this.filterControl.valueChanges.pipe(
        startWith(this.shopInfos),
        debounceTime(300),
        map(v => filterByNameAndId(v, this.shopInfos)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    selectLabel = this.route.params.pipe(
        pluck('envID'),
        map(e => e === RouteEnv.test)
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
        private route: ActivatedRoute
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
