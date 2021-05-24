import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { CreatePayoutDialogComponent } from './create-payout-dialog.component';

@Injectable()
export class CreatePayoutService {
    private destroy$: Subject<void> = new Subject();
    private createPayout$: Subject<void> = new Subject();
    private created$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    payoutCreated$: Observable<void> = this.created$.asObservable();

    constructor(private dialog: MatDialog) {}

    createPayout() {
        this.createPayout$.next();
    }

    init(realm: string) {
        this.createPayout$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() =>
                    this.dialog
                        .open(CreatePayoutDialogComponent, {
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
