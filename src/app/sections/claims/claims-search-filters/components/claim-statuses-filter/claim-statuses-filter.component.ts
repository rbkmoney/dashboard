import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';
import { combineLatest } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

import { StatusModificationUnit } from '@dsh/api-codegen/claim-management/swagger-codegen';
import { ClaimStatusesLabelPipe } from '@dsh/app/shared/components/inputs/claim-statuses-field';
import { FilterSuperclass } from '@dsh/components/filter';

import StatusEnum = StatusModificationUnit.StatusEnum;

@Component({
    selector: 'dsh-claim-statuses-filter',
    templateUrl: 'claim-statuses-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ClaimStatusesFilterComponent), ClaimStatusesLabelPipe],
})
export class ClaimStatusesFilterComponent extends FilterSuperclass<StatusEnum[]> {
    labels$ = this.savedValue$.pipe(
        switchMap((types) => combineLatest((types || []).map((type) => this.claimStatusesLabelPipe.transform(type)))),
        share()
    );

    constructor(injector: Injector, private claimStatusesLabelPipe: ClaimStatusesLabelPipe) {
        super(injector);
    }

    save(): void {
        if (this.formControl.value?.length === Object.keys(StatusEnum).length)
            this.formControl.patchValue(this.createEmpty());
        this.savedValue = this.formControl.value;
    }
}
