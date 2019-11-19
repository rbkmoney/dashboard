import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { InitialDataService } from './initial-data.service';
import { SpinnerType } from '../../../spinner';
import { LeaveDialogComponent } from './leave-dialog';

@Component({
    selector: 'dsh-document-upload',
    templateUrl: 'document-upload.component.html',
    styleUrls: ['document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    claimID: number;
    initialFiles$ = this.initialDataService.initialFiles$;
    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private initialDataService: InitialDataService
    ) {}

    ngOnInit() {
        this.route.params.pipe(pluck('claimID')).subscribe(claimID => {
            this.claimID = claimID;
            this.initialDataService.initialize(claimID);
        });
    }

    cancel() {
        this.dialog.open(LeaveDialogComponent);
    }

    done() {
        this.router.navigate(['claim', this.claimID]);
    }
}
