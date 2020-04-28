import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, pluck, shareReplay, take } from 'rxjs/operators';

import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByEnv, mapToShopInfo, removeEmptyProperties, ShopInfo } from '../../operations/operators';
import { SearchParams } from '../search-params';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toSearchParams } from './to-search-params';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
    @Input()
    formValue: SearchParams;

    @Output()
    valueChanges = new EventEmitter<SearchParams>();

    shopsInfo$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(SHARE_REPLAY_CONF)
    );

    private defaultParams: FormParams = {
        shopIDs: null,
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month'),
            period: 'month'
        }
    };

    form = this.fb.group(this.defaultParams);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {}

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                filter(v => !!v),
                debounceTime(300),
                removeEmptyProperties,
                map(toSearchParams)
            )
            .subscribe(v => {
                this.router.navigate([location.pathname], { queryParams: v });
                this.valueChanges.emit(v);
            });
        this.route.queryParams
            .pipe(
                take(1),
                map(v => toFormValue(v, this.defaultParams))
            )
            .subscribe(v => this.form.patchValue(v));
    }
}
