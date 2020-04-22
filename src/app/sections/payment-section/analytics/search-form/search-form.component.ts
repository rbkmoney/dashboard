import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, map, shareReplay, take } from 'rxjs/operators';

import { SearchParams } from '../search-params';
import { removeEmptyProperties } from '../../operations/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../../../api/shop';
import { toQueryParams } from './to-query-params';
import { toSearchParams } from './to-search-params';
import { FormParams } from './form-params';
import moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { toFormValue } from './to-form-value';
import { QueryParams } from './query-params';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

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

    shops$ = this.shopService.getShops().pipe(shareReplay(SHARE_REPLAY_CONF));

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
    ) {
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(debounceTime(300), removeEmptyProperties)
            .subscribe((v) => {
                this.router.navigate([location.pathname], { queryParams: toQueryParams(v) });
                this.valueChanges.emit(toSearchParams(v));
            });
        this.route.queryParams
            .pipe(take(1), map((v: QueryParams) => toFormValue(v, this.defaultParams)))
            .subscribe((v) => this.form.patchValue(v));
    }
}
