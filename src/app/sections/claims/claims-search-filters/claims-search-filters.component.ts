import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Claim } from '@dsh/api-codegen/claim-management';
import { ClaimStatusesEnum } from '@dsh/app/shared/components/inputs/claim-statuses-field/types/claim-statuses-enum';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

export interface Filters {
    claimID: Claim['id'];
    claimStatuses?: ClaimStatusesEnum[];
}

@UntilDestroy()
@Component({
    selector: 'dsh-claims-search-filters',
    templateUrl: 'claims-search-filters.component.html',
})
export class ClaimsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    form = this.fb.group<Filters>({ claimStatuses: null, claimID: null });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<ClaimsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) this.form.patchValue(initParams.currentValue);
    }
}
