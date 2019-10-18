import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { filter, switchMap, catchError, pluck } from 'rxjs/operators';
import * as uuid from 'uuid/v4';
import { TranslocoService } from '@ngneat/transloco';

import { LeaveOnboardingDialogComponent } from './leave-onboarding-dialog';
import { ClaimsService, QuestionaryService, createDocumentModificationUnit } from '../../../api';
import { PartyContent, OrgType } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData } from '../../../api-codegen/questionary';

@Injectable()
export class CompanySearchService {
    form: FormGroup = this.fb.group({
        searchStr: ''
    });

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private fb: FormBuilder,
        private claimsService: ClaimsService,
        private questionaryService: QuestionaryService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    isKnownOrgType({ orgType }: PartyContent): boolean {
        if (!orgType) {
            return false;
        }
        switch (orgType) {
            case OrgType.Legal:
            case OrgType.Individual:
                return true;
            default:
                return false;
        }
    }

    createInitialClaim(data: QuestionaryData): Observable<number> {
        const questionaryID = uuid();
        const changeset = [createDocumentModificationUnit(1, questionaryID)];
        return this.questionaryService.saveQuestionary(questionaryID, data).pipe(
            switchMap(() => this.claimsService.createClaim(changeset)),
            pluck('id'),
            catchError(err => {
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                return throwError(err);
            })
        );
    }

    goToOnboardingFlow(claimID: number) {
        this.router.navigate(['onboarding', claimID, 'basic-info']);
    }

    showLeaveOnboardingDialog(): Observable<void> {
        return this.dialog
            .open(LeaveOnboardingDialogComponent, {
                width: '450px'
            })
            .afterClosed()
            .pipe(filter(r => r === 'decline'));
    }

    leave() {
        this.router.navigate(['/']);
    }
}
