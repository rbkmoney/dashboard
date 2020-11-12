import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { WebhooksService } from '../../../../../api';

@Injectable()
export class DeleteWebhookService {
    private destroy$: Subject<void> = new Subject();
    private deleteWebhook$: Subject<string> = new Subject();
    private deleted$: Subject<void> = new Subject();

    webhookDeleted$: Observable<void> = this.deleted$.asObservable();

    constructor(
        private dialog: MatDialog,
        private webhooksService: WebhooksService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    deleteWebhook(id: string) {
        this.deleteWebhook$.next(id);
    }

    init() {
        this.deleteWebhook$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((params) =>
                    combineLatest([
                        of(params),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r === 'confirm')),
                    ])
                ),
                switchMap(([webhookID]) =>
                    this.webhooksService.deleteWebhookByID(webhookID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.snackBar.open(this.transloco.translate('errors.deleteError', null, 'webhook'), 'OK');
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => this.deleted$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
