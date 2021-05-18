import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Payout } from '@dsh/api-codegen/anapi';

import { CreatePayoutReportDialogComponent } from './create-payout-report-dialog.component';

@Injectable()
export class CreatePayoutReportService {
    private destroy$: Subject<void> = new Subject();
    private createPayoutReport$: Subject<Payout> = new Subject();

    constructor(private dialog: MatDialog) {}

    createPayoutReport(payout: Payout) {
        this.createPayoutReport$.next(payout);
    }

    init() {
        this.createPayoutReport$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((payout) =>
                    this.dialog
                        .open(CreatePayoutReportDialogComponent, {
                            data: {
                                payout,
                            },
                        })
                        .afterClosed()
                )
            )
            .subscribe();
    }

    destroy() {
        this.destroy$.next();
    }
}
