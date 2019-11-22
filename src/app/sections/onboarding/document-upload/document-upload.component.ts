import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SpinnerType } from '../../../spinner';
import { LeaveDialogComponent } from './leave-dialog';
import { DocumentUploadService } from './document-upload.service';

@Component({
    selector: 'dsh-document-upload',
    templateUrl: 'document-upload.component.html',
    styleUrls: ['document-upload.component.scss'],
    providers: [DocumentUploadService]
})
export class DocumentUploadComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    claimID: number;
    files$ = this.documentUploadService.files$;
    hasFiles$ = this.documentUploadService.hasFiles$;
    errors$ = this.documentUploadService.errors$;

    console = console;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private documentUploadService: DocumentUploadService
    ) {}

    cancel() {
        this.dialog.open(LeaveDialogComponent);
    }

    done() {
        this.router.navigate(['claim', this.claimID]);
    }
}
