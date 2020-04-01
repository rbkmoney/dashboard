import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, map, pluck, switchMap } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ClaimsService, createDocumentModificationUnit, KonturFocusService, QuestionaryService } from '../../../api';
import { OrgType, PartyContent, ReqResponse } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData } from '../../../api-codegen/questionary';
import { KeycloakService } from '../../../auth';

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
        private konturFocusService: KonturFocusService,
        private keycloakService: KeycloakService
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
        const defaultEmail = this.keycloakService.getUsername();
        const questionaryData: QuestionaryData = { ...data, contactInfo: { email: defaultEmail, ...data.contactInfo } };
        return this.questionaryService.saveQuestionary(initialDocumentID, questionaryData).pipe(
            switchMap(() => forkJoin([of(initialDocumentID), this.claimsService.createClaim(changeset)])),
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
