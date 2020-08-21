import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ReportsService } from '../../../../api';

@Injectable()
export class CancelReportService {
    private destroy$: Subject<void> = new Subject();
    private cancelReport$: Subject<number> = new Subject();
    private cancelled$: Subject<void> = new Subject();

    reportCancelled$: Observable<void> = this.cancelled$.asObservable();

    constructor(
        private dialog: MatDialog,
        private reportsService: ReportsService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    cancelReport(reportID: number) {
        this.cancelReport$.next(reportID);
    }

    init() {
        this.cancelReport$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((reportID) =>
                    combineLatest([
                        of(reportID),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r === 'confirm')),
                    ])
                ),
                switchMap(([reportID]) =>
                    this.reportsService.cancelReport(reportID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.snackBar.open(
                                this.transloco.translate('errors.cancelError', null, 'reports|scoped'),
                                'OK'
                            );
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => this.cancelled$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
