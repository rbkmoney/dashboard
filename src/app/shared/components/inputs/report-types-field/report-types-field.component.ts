import { Component, Injector, OnChanges } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { Report } from '@dsh/api-codegen/anapi';
import { valuesToOptions } from '@dsh/components/form-controls/utils/values-to-options';

import { ReportTypesLabelPipe } from './pipes/report-types-label.pipe';

import ReportTypeEnum = Report.ReportTypeEnum;

@Component({
    selector: 'dsh-report-types-field',
    templateUrl: 'report-types-field.component.html',
    providers: [provideValueAccessor(ReportTypesFieldComponent), ReportTypesLabelPipe],
})
export class ReportTypesFieldComponent extends WrappedFormControlSuperclass<ReportTypeEnum[]> implements OnChanges {
    options$ = valuesToOptions(Object.values(ReportTypeEnum), (v) => this.reportTypesLabelPipe.transform(v));

    constructor(injector: Injector, private reportTypesLabelPipe: ReportTypesLabelPipe) {
        super(injector);
    }
}
