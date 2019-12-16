import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { StepFlowService } from '../step-flow';
import { QuestionaryStateService } from '../questionary-state.service';
import { ClaimsService } from '../../../../api';
import { InitialDataService } from '../initial-data.service';
import { FinishOnboardingDialogComponent } from '../finish-onboarding-dialog';

@Injectable()
export class StepCardService {
    private selectStepFlowIndex$: Subject<number> = new Subject();
    private finishFormFlow$: Subject<void> = new Subject();

    constructor(
        private stepFlowService: StepFlowService,
        private questionaryStateService: QuestionaryStateService,
        private router: Router,
        private claimsService: ClaimsService,
        private initialDataService: InitialDataService,
        private dialog: MatDialog
    ) {
        combineLatest(this.selectStepFlowIndex$, this.stepFlowService.stepFlow$)
            .pipe(map(([i, stepFlow]) => stepFlow[i]))
            .subscribe(step => {
                this.questionaryStateService.save();
                this.stepFlowService.navigate(step);
            });
        this.finishFormFlow$
            .pipe(
                switchMap(() => this.initialDataService.claimID$),
                switchMap(claimID => this.claimsService.getClaimByID(claimID)),
                switchMap(({ id, revision }) => this.claimsService.requestReviewClaimByID(id, revision)),
                switchMap(() =>
                    this.dialog
                        .open(FinishOnboardingDialogComponent, {
                            disableClose: true,
                            width: '600px'
                        })
                        .afterClosed()
                ),
                switchMap(() => this.initialDataService.claimID$)
            )
            .subscribe(claimID => this.router.navigate(['claim', claimID, 'documents']));
    }

    finishFormFlow() {
        this.questionaryStateService.save();
        this.finishFormFlow$.next();
    }

    selectStepFlowIndex(index: number) {
        this.selectStepFlowIndex$.next(index);
    }
}
