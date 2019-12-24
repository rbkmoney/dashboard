import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject, of, Subscription, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StepFlowService } from '../step-flow';
import { QuestionaryStateService } from '../questionary-state.service';
import { ClaimsService } from '../../../../api';
import { InitialDataService } from '../initial-data.service';
import { FinishOnboardingDialogComponent } from '../finish-onboarding-dialog';

@Injectable()
export class StepCardService {
    private selectStepFlowIndex$: Subject<number> = new Subject();
    private finishFormFlow$: Subject<void> = new Subject();

    private subs: Subscription[];

    constructor(
        private stepFlowService: StepFlowService,
        private questionaryStateService: QuestionaryStateService,
        private router: Router,
        private claimsService: ClaimsService,
        private initialDataService: InitialDataService,
        private dialog: MatDialog
    ) {
        const selectStepFlowIndexSub = this.selectStepFlowIndex$
            .pipe(
                switchMap(i => zip(of(i), this.stepFlowService.stepFlow$)),
                map(([i, stepFlow]) => stepFlow[i])
            )
            .subscribe(step => {
                this.questionaryStateService.save();
                this.stepFlowService.navigate(step);
            });

        const finishFormFlowSub = this.finishFormFlow$
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
        this.subs = [selectStepFlowIndexSub, finishFormFlowSub];
    }

    finishFormFlow() {
        this.questionaryStateService.save();
        this.finishFormFlow$.next();
        this.finishFormFlow$.complete();
    }

    selectStepFlowIndex(index: number) {
        this.selectStepFlowIndex$.next(index);
    }

    unsubscribe() {
        for (const sub of this.subs) {
            sub.unsubscribe();
        }
    }
}
