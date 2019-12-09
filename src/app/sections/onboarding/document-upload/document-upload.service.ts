import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { booleanDelay } from '../../../custom-operators';
import { ClaimsService } from '../../../api';
import { Claim } from '../../../api-codegen/claim-management/swagger-codegen';
import { LeaveDialogComponent } from './leave-dialog';

@Injectable()
export class DocumentUploadService {
    claim$: Observable<Claim> = this.route.params.pipe(
        switchMap(({ claimID }) => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    isLoading$: Observable<boolean> = this.claim$.pipe(
        booleanDelay(0),
        shareReplay(1)
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private claimService: ClaimsService
    ) {}

    cancel() {
        this.dialog
            .open(LeaveDialogComponent, { width: '450px' })
            .afterClosed()
            .pipe(filter(v => v))
            .subscribe(() => this.claim$.subscribe(({ id }) => this.router.navigate(['onboarding', id])));
    }

    done() {
        this.claim$.subscribe(({ id }) => this.router.navigate(['claim', id]));
    }
}
