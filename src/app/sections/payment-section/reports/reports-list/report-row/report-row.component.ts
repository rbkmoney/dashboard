import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Report } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-report-row',
    templateUrl: 'report-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportRowComponent {
    @Input() report: Report;
}
