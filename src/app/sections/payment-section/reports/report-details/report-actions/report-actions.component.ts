import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-report-actions',
    templateUrl: 'report-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportActionsComponent {
    @Input() reportID: number;
    @Output() cancelReport: EventEmitter<number> = new EventEmitter();
}
