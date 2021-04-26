import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { IdentityService } from '@dsh/api/identity';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';

@Injectable()
export class CreateWebhookService {
    private createWebhook$ = new Subject<void>();
    private created$: Subject<void> = new Subject();
    private destroy$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhookCreated$: Observable<void> = this.created$.asObservable();

    constructor(private dialog: MatDialog, private identityService: IdentityService) {}

    init() {
        this.createWebhook$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() => this.identityService.identities$.pipe(take(1))),
                switchMap((identities) =>
                    this.dialog
                        .open(CreateWebhookDialogComponent, {
                            width: '552px',
                            disableClose: true,
                            autoFocus: false,
                            data: identities,
                        })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                )
            )
            .subscribe(() => {
                this.created$.next();
            });
    }

    createWebhook() {
        this.createWebhook$.next();
    }

    destroy() {
        this.destroy$.next();
    }
}
