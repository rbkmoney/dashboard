import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError, Subject } from 'rxjs';
import { filter, switchMap, catchError, pluck } from 'rxjs/operators';
import * as uuid from 'uuid/v4';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimsService, QuestionaryService, createDocumentModificationUnit } from '../../../api';
import { PartyContent, OrgType } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData } from '../../../api-codegen/questionary';
import { ConfirmActionDialog } from '../../../confirm-action-dialog';

@Injectable()
export class CompanySearchService {
    private leaveOnboarding$ = new Subject();

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
    ) {
        this.leaveOnboarding$
            .pipe(
                switchMap(() =>
                    this.dialog
                        .open(ConfirmActionDialog)
                        .afterClosed()
                        .pipe(filter(r => r === 'confirm'))
                )
            )
            .subscribe(() => this.router.navigate(['/']));
    }

    isKnownOrgType({ orgType }: PartyContent): boolean {
        return Object.values(OrgType).includes(orgType);
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

    leaveOnboarding() {
        this.leaveOnboarding$.next();
    }
}
