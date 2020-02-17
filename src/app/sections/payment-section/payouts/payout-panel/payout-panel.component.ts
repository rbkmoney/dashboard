import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

import { Payout } from '../../../../api-codegen/anapi';
import { CreateReportDialogComponent } from '../create-report-dialog';

@Component({
    selector: 'dsh-payout-panel',
    templateUrl: 'payout-panel.component.html',
    styleUrls: ['payout-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutPanelComponent {
    @Input() payout: Payout;

    constructor(private dialog: MatDialog) {}

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px',
                disableClose: true
            })
            .afterClosed()
            .pipe(filter(r => r === 'created'))
            .subscribe();
    }
}
