import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import isNil from 'lodash-es/isNil';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { RefundSearchResult } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Shop } from '@dsh/api-codegen/capi/swagger-codegen';
import { ApiShopsService } from '@dsh/api/shop';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';

import { daterangeFromStr, strToDaterange } from '../../../../../shared/utils';
import { filterShopsByRealm } from '../../operators';
import { SearchFiltersParams } from '../types/search-filters-params';
import { getDefaultDaterange } from './get-default-daterange';

@UntilDestroy()
@Component({
    selector: 'dsh-refunds-search-filters',
    templateUrl: 'refunds-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsSearchFiltersComponent implements OnChanges, OnInit {
    @Input() initParams: SearchFiltersParams;

    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }

    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;

    shops$: Observable<Shop[]>;

    selectedShops$: Observable<Shop[]>;

    form = this.fb.group<{ invoiceIDs: string[] }>({ invoiceIDs: [] });

    private realm$ = new ReplaySubject();
    private selectedShopIDs$ = new ReplaySubject<string[]>(1);
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {
        this.shops$ = this.realm$.pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
        this.selectedShops$ = this.selectedShopIDs$.pipe(
            switchMap((ids) =>
                this.shops$.pipe(
                    take(1),
                    map((shops) => shops.filter((shop) => ids.includes(shop.id)))
                )
            ),
            shareReplay(1)
        );
    }

    ngOnInit() {
        this.selectedShopIDs$
            .pipe(
                map((ids) => (ids.length ? ids : null)),
                untilDestroyed(this)
            )
            .subscribe((shopIDs) => this.searchParams$.next({ shopIDs }));
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.setValue({ invoiceIDs: this.initParams?.invoiceIDs || [] });
    }

    ngOnChanges({ initParams }: SimpleChanges) {
        this.init(initParams);
    }

    daterangeSelectionChange(range: Daterange | null) {
        const daterange = isNil(range) ? getDefaultDaterange() : range;
        if (isNil(range)) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeFromStr(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.selectedShopIDs$.next(shopIDs);
    }

    statusSelectionChange(refundStatus: RefundSearchResult.StatusEnum) {
        this.searchParams$.next({ refundStatus });
    }

    private init(initParams: SimpleChange) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            const v = initParams.currentValue;
            this.daterange = !(v.fromTime || v.toTime) ? getDefaultDaterange() : strToDaterange(v);
            this.daterangeSelectionChange(this.daterange);
            if (Array.isArray(v.shopIDs)) {
                this.selectedShopIDs$.next(v.shopIDs);
            }
        }
    }
}
