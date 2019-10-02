import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { filter, map, switchMap, catchError } from 'rxjs/operators';
import get from 'lodash.get';
import * as uuid from 'uuid/v4';
import { TranslocoService } from '@ngneat/transloco';

import { ContractorType } from './contractor-type';
import { SuggestionData } from '../../../dadata/model/suggestions';
import { SuggestionType } from '../../../dadata/model/type';
import { LeaveOnboardingDialogComponent } from './leave-onboarding-dialog';
import { toQuestionaryData } from './to-questionary-data';
import { ClaimsService, QuestionaryService, createDocumentModificationUnit } from '../../../api';

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

    suggestionToContractorType(suggestion: SuggestionData<SuggestionType.party>): ContractorType | null {
        const suggestionType = get(suggestion, ['data', 'type']);
        if (!suggestionType) {
            return null;
        }
        switch (suggestionType) {
            case 'LEGAL':
                return ContractorType.LegalEntity;
            case 'INDIVIDUAL':
                return ContractorType.IndividualEntity;
            default:
                return null;
        }
    }

    createInitialClaim(type: ContractorType): Observable<number> {
        const questionaryID = uuid();
        const changeset = [createDocumentModificationUnit(1, questionaryID)];
        return this.questionaryService.saveQuestionary(questionaryID, toQuestionaryData(type)).pipe(
            switchMap(() => this.claimsService.createClaim(changeset)),
            map(c => c.id),
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
