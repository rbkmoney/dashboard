import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { ClaimStatusesEnum } from '@dsh/app/shared/components/inputs/claim-statuses-field/types/claim-statuses-enum';

import { removeEmptyProperties } from '../../payment-section/operations/operators';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters-search-params';

@UntilDestroy()
@Component({
    selector: 'dsh-claims-search-filters',
    templateUrl: 'claims-search-filters.component.html',
})
export class ClaimsSearchFiltersComponent implements OnInit {
    form = this.fb.group<{ claimStatuses: ClaimStatusesEnum[] }>({ claimStatuses: null });

    private searchParams$: Subject<Partial<ClaimsSearchFiltersSearchParams>> = new ReplaySubject(1);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    initParams: ClaimsSearchFiltersSearchParams;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    searchParamsChanges = new EventEmitter<ClaimsSearchFiltersSearchParams>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['claimStatuses']));

        const { claimID } = this.initParams;
        this.claimIDChange(claimID);
    }

    claimIDChange(claimID: number): void {
        this.searchParams$.next({ claimID });
    }

    statusesSelectionChange(claimStatuses: ClaimStatusesEnum[]): void {
        this.searchParams$.next({ claimStatuses });
    }
}
