import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter } from 'rxjs/operators';

import { CreateWebhookDialogService } from './create-webhook-dialog.service';

@Component({
    templateUrl: 'create-webhook-dialog.component.html',
    styleUrls: ['create-webhook-dialog.component.scss'],
    providers: [CreateWebhookDialogService],
})
export class CreateWebhookDialogComponent implements OnInit {
    form = this.createWebhookDialogService.form;
    isLoading$ = this.createWebhookDialogService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookDialogComponent>,
        private createWebhookDialogService: CreateWebhookDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {
        this.createWebhookDialogService.webhookCreated$.pipe(filter((r) => !!r)).subscribe((r) => {
            this.dialogRef.close(r);
        });
    }

    ngOnInit() {
        this.createWebhookDialogService.webhookCreated$.subscribe(() => this.dialogRef.close('created'));
        this.createWebhookDialogService.errorOccurred$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.createError', null, 'reports'), 'OK')
        );
    }

    save() {
        this.createWebhookDialogService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
