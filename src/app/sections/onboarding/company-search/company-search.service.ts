import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import get from 'lodash.get';
import * as uuid from 'uuid/v4';

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
        private questionaryService: QuestionaryService
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
        const modificationUnit = createDocumentModificationUnit(1, questionaryID);
        const data = toQuestionaryData(type);
        return this.questionaryService.saveQuestionary(questionaryID, data).pipe(
            switchMap(() => this.claimsService.createClaim([modificationUnit])),
            map(c => c.id)
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
