import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Report } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-report-details',
    templateUrl: 'report-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent {
    @Input() report: Report;
    @Output() collapse: EventEmitter<MouseEvent> = new EventEmitter();
}
