import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { CreateReportDialogComponent } from './create-report-dialog.component';

@Injectable()
export class CreateReportService {
    private destroy$: Subject<void> = new Subject();
    private createReport$: Subject<void> = new Subject();
    private created$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    reportCreated$: Observable<void> = this.created$.asObservable();

    constructor(private dialog: MatDialog) {}

    createReport() {
        this.createReport$.next();
    }

    init(realm: string) {
        this.createReport$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() =>
                    this.dialog
                        .open(CreateReportDialogComponent, {
                            data: {
                                realm,
                            },
                        })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                )
            )
            .subscribe(() => this.created$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
