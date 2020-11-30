import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import isEqual from 'lodash.isequal';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { StatusModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters-search-params';

@Component({
    selector: 'dsh-claims-search-filters',
    templateUrl: 'claims-search-filters.component.html',
})
export class ClaimsSearchFiltersComponent implements OnInit {
    private searchParams$: Subject<Partial<ClaimsSearchFiltersSearchParams>> = new ReplaySubject(1);

    @Input() initParams: ClaimsSearchFiltersSearchParams;

    @Output()
    searchParamsChanges = new EventEmitter<ClaimsSearchFiltersSearchParams>();

    ngOnInit() {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
    }

    claimIDchange(claimID: number) {
        this.searchParams$.next({ claimID });
    }

    statusesSelectionChange(claimStatuses: StatusModificationUnit.StatusEnum) {
        this.searchParams$.next({ claimStatuses });
    }
}
