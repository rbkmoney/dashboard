import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';
import { combineLatest } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

import { Report } from '@dsh/api-codegen/anapi';
import { ReportTypesLabelPipe } from '@dsh/app/shared/components/inputs/report-types-field';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-report-types-filter',
    templateUrl: 'report-types-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ReportTypesFilterComponent), ReportTypesLabelPipe],
})
export class ReportTypesFilterComponent extends FilterSuperclass<Report.ReportTypeEnum[]> {
    labels$ = this.savedValue$.pipe(
        switchMap((types) => combineLatest((types || []).map((type) => this.reportTypesLabelPipe.transform(type)))),
        share()
    );

    constructor(injector: Injector, private reportTypesLabelPipe: ReportTypesLabelPipe) {
        super(injector);
    }

    save(): void {
        if (this.formControl.value?.length === Object.keys(Report.ReportTypeEnum).length)
            this.formControl.patchValue(this.createEmpty());
        this.savedValue = this.formControl.value;
    }
}
