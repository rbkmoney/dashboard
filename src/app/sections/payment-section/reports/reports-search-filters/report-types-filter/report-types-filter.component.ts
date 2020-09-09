import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Report } from '../../../../../api-codegen/anapi';

type ReportType = Report.ReportTypeEnum;

@Component({
    selector: 'dsh-report-types-filter',
    templateUrl: 'report-types-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportTypesFilterComponent {
    @Input() selected: ReportType[];
    @Output() selectionChange: EventEmitter<ReportType[]> = new EventEmitter();

    reportTypes: ReportType[] = Object.values(Report.ReportTypeEnum);

    compareWithReportType(s1: ReportType, s2: ReportType): boolean {
        return s1 === s2;
    }
}
