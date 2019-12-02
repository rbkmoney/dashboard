import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';

import { LeaveDialogComponent } from './leave-dialog';
import { DocumentUploadService } from './document-upload.service';
import { SpinnerType } from '../../../spinner';

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
    isLoading$ = this.documentUploadService.isLoading$;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private documentUploadService: DocumentUploadService
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
        this.documentUploadService.updateClaim(uploadedFiles);
    }
}
