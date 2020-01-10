import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError, Subject, forkJoin, of } from 'rxjs';
import { filter, switchMap, catchError, pluck, map } from 'rxjs/operators';
import * as uuid from 'uuid/v4';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimsService, QuestionaryService, createDocumentModificationUnit, KonturFocusService } from '../../../api';
import { PartyContent, OrgType, ReqResponse } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData } from '../../../api-codegen/questionary';
import { ConfirmActionDialogComponent } from '../../../confirm-action-dialog';

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
        private snackBar: MatSnackBar,
        private konturFocusService: KonturFocusService
    ) {
        this.leaveOnboarding$
            .pipe(
                switchMap(() =>
                    this.dialog
                        .open(ConfirmActionDialogComponent)
                        .afterClosed()
                        .pipe(filter(r => r === 'confirm'))
                )
            )
            .subscribe(() => this.router.navigate(['/']));
    }

    isKnownOrgType({ orgType }: PartyContent): boolean {
        return Object.values(OrgType).includes(orgType);
    }

    createInitialClaim(data: QuestionaryData): Observable<{ claimID: number; documentID: string }> {
        const initialDocumentID = uuid();
        const changeset = [createDocumentModificationUnit(initialDocumentID)];
        return this.questionaryService.saveQuestionary(initialDocumentID, data).pipe(
            switchMap(() => forkJoin(of(initialDocumentID), this.claimsService.createClaim(changeset))),
            map(([documentID, { id }]) => ({ documentID, claimID: id })),
            catchError(err => {
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                return throwError(err);
            })
        );
    }

    goToOnboardingFlow(claimID: number, documentID: string) {
        this.router.navigate(['onboarding', 'claim', claimID, 'document', documentID, 'step', 'basic-info']);
    }

    leaveOnboarding() {
        this.leaveOnboarding$.next();
    }

    loadKonturFocusData(inn: string): Observable<ReqResponse> {
        return this.konturFocusService
            .request('ReqQuery', {
                inn: [inn]
            })
            .pipe(pluck(0));
    }
}
