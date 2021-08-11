import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dsh-payout-actions',
    templateUrl: 'payout-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutActionsComponent {
    @Output() createReport: EventEmitter<void> = new EventEmitter<void>();
}
