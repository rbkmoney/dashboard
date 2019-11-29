import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { SpinnerType } from '../../../spinner';
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
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    filesData$ = this.documentUploadService.filesData$;
    claim$ = this.documentUploadService.claim$;
    hasFiles$ = this.documentUploadService.hasFiles$;
    errors$ = this.documentUploadService.errors$;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private documentUploadService: DocumentUploadService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    cancel() {
        this.dialog.open(LeaveDialogComponent, { width: '450px' });
    }

    done() {
        this.claim$.pipe(first()).subscribe(({ id }) => this.router.navigate(['claim', id]));
    }

    updateClaim(uploadedFiles: string[]) {
        this.documentUploadService
            .updateClaim(uploadedFiles)
            .pipe(
                first(),
                takeError
            )
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
