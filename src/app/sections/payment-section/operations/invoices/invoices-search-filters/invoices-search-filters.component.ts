import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import isEqual from 'lodash.isequal';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan, shareReplay } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';
import { Shop } from '../../../../../api-codegen/capi/swagger-codegen';
import { ShopService } from '../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByRealm } from '../../operators';
import { getDefaultDaterange } from './get-default-daterange';
import { SearchFiltersParams } from './search-filters-params';
import { daterangeToTimes, timesToDaterange } from '../../../../../shared/utils';


@Component({
    selector: 'dsh-invoices-search-filters',
    templateUrl: 'invoices-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesSearchFiltersComponent implements OnChanges, OnInit {
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    @Input() initParams: SearchFiltersParams;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }

    daterange: Daterange;

    private realm$ = new ReplaySubject();

    shops$: Observable<Shop[]> = this.realm$.pipe(
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopService: ShopService) {}

    ngOnInit() {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
    }

    ngOnChanges({ initParams }: SimpleChanges) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            const v = initParams.currentValue;
            this.daterange = !(v.fromTime || v.toTime) ? getDefaultDaterange() : timesToDaterange(v);
            this.daterangeSelectionChange(this.daterange);
        }
    }

    daterangeSelectionChange(v: Daterange | null) {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToTimes(daterange));
    }

    shopSelectionChange(shops: Shop[]) {
        const shopIDs = shops.map((shop) => shop.id);
        this.searchParams$.next({ shopIDs: shopIDs?.length ? shopIDs : null });
    }

    invoiceSelectionChange(invoiceIDs: string[]) {
        this.searchParams$.next({ invoiceIDs: invoiceIDs?.length ? invoiceIDs : null });
    }

    statusSelectionChange(invoiceStatus: Invoice.StatusEnum) {
        this.searchParams$.next({ invoiceStatus });
    }
}
