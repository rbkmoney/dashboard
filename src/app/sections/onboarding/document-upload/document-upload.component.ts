import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { LeaveDialogComponent } from './leave-dialog';
import { DocumentUploadService } from './document-upload.service';
import { takeError } from '../../../custom-operators';

@Component({
    selector: 'dsh-document-upload',
    templateUrl: 'document-upload.component.html',
    styleUrls: ['document-upload.component.scss'],
    providers: [DocumentUploadService]
})
export class DocumentUploadComponent {
    filesData$ = this.documentUploadService.filesData$;
    claim$ = this.documentUploadService.claim$;
    hasFiles$ = this.documentUploadService.hasFiles$;
    error$ = this.documentUploadService.error$;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private documentUploadService: DocumentUploadService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    cancel() {
        this.dialog
            .open(LeaveDialogComponent, { width: '450px' })
            .afterClosed()
            .pipe(first())
            .subscribe(
                result =>
                    result && this.claim$.pipe(first()).subscribe(({ id }) => this.router.navigate(['onboarding', id]))
            );
    }

    done() {
        this.claim$.pipe(first()).subscribe(({ id }) => this.router.navigate(['claim', id]));
    }

    updateClaim(uploadedFiles: string[]) {
        this.documentUploadService
            .updateClaim(uploadedFiles)
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
