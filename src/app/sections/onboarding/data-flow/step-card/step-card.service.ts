import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, Subject, zip } from 'rxjs';
import { map, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { ClaimsService } from '../../../../api';
import { FinishOnboardingDialogComponent } from '../finish-onboarding-dialog';
import { QuestionaryStateService } from '../questionary-state.service';
import { StepFlowService } from '../step-flow';
import { ValidityService } from '../validity';
import { StepNavInfo, toStepNavInfo } from './to-step-nav-info';

@Injectable()
export class StepCardService {
    private selectStepFlowIndex$: Subject<number> = new Subject();
    private finishFormFlow$: Subject<void> = new Subject();

    stepNavInfo$: Observable<StepNavInfo[]> = combineLatest(
        this.validityService.validitySteps$,
        this.stepFlowService.activeStep$
    ).pipe(toStepNavInfo, shareReplay(1));

    constructor(
        private stepFlowService: StepFlowService,
        private questionaryStateService: QuestionaryStateService,
        private router: Router,
        private claimsService: ClaimsService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private validityService: ValidityService
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
                switchMapTo(claimID$),
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
                switchMapTo(claimID$)
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
