import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject, of, zip } from 'rxjs';
import { map, switchMap, pluck } from 'rxjs/operators';

import { StepFlowService } from '../step-flow';
import { QuestionaryStateService } from '../questionary-state.service';
import { ClaimsService } from '../../../../api';
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
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {
        const claimID$ = this.route.params.pipe(pluck('claimID'));
        this.selectStepFlowIndex$
            .pipe(
                switchMap(i => zip(of(i), this.stepFlowService.stepFlow$)),
                map(([i, stepFlow]) => stepFlow[i])
            )
            .subscribe(step => {
                this.questionaryStateService.save();
                this.stepFlowService.navigate(step);
            });

        this.finishFormFlow$
            .pipe(
                switchMap(() => claimID$),
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
                switchMap(() => claimID$)
            )
            .subscribe(claimID => this.router.navigate(['claim', claimID, 'documents']));
    }

    finishFormFlow() {
        this.questionaryStateService.save();
        this.finishFormFlow$.next();
        this.finishFormFlow$.complete();
    }

    selectStepFlowIndex(index: number) {
        this.selectStepFlowIndex$.next(index);
    }
}
