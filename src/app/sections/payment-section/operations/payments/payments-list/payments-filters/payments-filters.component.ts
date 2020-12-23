import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { Daterange } from '@dsh/pipes/daterange';

import { ComponentChange, ComponentChanges } from '../../../../../../../type-utils';
import { AdditionalFiltersService } from './additional-filters';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
import { ShopsSelectionManagerService } from './services/shops-selection-manager/shops-selection-manager.service';
import { PaymentsAdditionalFilters } from './types/payments-additional-filters';
import { PaymentsFiltersData } from './types/payments-filters-data';

@UntilDestroy()
@Component({
    selector: 'dsh-payments-filters',
    templateUrl: 'payments-filters.component.html',
})
export class PaymentsFiltersComponent implements OnInit, OnChanges {
    @Input() realm: PaymentInstitutionRealm;

    @Output() filtersChanged = new EventEmitter<PaymentsFiltersData>();

    filtersData$: Observable<PaymentsFiltersData> = this.filtersHandler.filtersData$;

    isAdditionalFilterApplied: boolean;

    shops$: Observable<Shop[]> = this.shopService.shops$;
    selectedShops$: Observable<Shop[]> = this.shopService.selectedShops$;

    constructor(
        private shopService: ShopsSelectionManagerService,
        private filtersHandler: PaymentsFiltersService,
        private additionalFilters: AdditionalFiltersService
    ) {}

    ngOnInit(): void {
        this.filtersData$.pipe(untilDestroyed(this)).subscribe((filtersData: PaymentsFiltersData) => {
            this.filtersChanged.emit(filtersData);
            const { shopIDs = [] } = filtersData;
            this.shopService.setSelectedIds(shopIDs);
        });
    }

    ngOnChanges(changes: ComponentChanges<PaymentsFiltersComponent>): void {
        if (isObject(changes.realm)) {
            this.updateRealm(changes.realm);
        }
    }

    openFiltersDialog() {
        this.filtersData$
            .pipe(
                take(1),
                map((filtersData: PaymentsFiltersData) => filtersData.additional),
                switchMap((filters: PaymentsAdditionalFilters) => {
                    return this.additionalFilters.openFiltersDialog(filters);
                }),
                untilDestroyed(this)
            )
            .subscribe((filters: PaymentsAdditionalFilters) => {
                this.isAdditionalFilterApplied = !isEmpty(filters);
            });
    }

    dateRangeChange(dateRange: Daterange): void {
        this.updateFilters({ daterange: dateRange });
    }

    invoiceSelectionChange(invoiceIds: string[]): void {
        this.updateFilters({ invoiceIDs: invoiceIds });
    }

    shopSelectionChange(selectedShops: Shop[]): void {
        this.updateFilters({
            shopIDs: selectedShops.map(({ id }: Shop) => id),
        });
    }

    private updateRealm(change: ComponentChange<PaymentsFiltersComponent, 'realm'>): void {
        const realm = change.currentValue;
        if (isNil(realm)) {
            return;
        }

        this.shopService.setRealm(realm);
    }

    private updateFilters(change: Partial<PaymentsFiltersData>): void {
        this.filtersHandler.changeFilters({
            ...change,
        });
    }
}
