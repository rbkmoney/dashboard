import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { QuestionaryStateService } from '../questionary-state.service';
import { StepFlowService } from '../step-flow';
import { ValidityService } from '../validity';
import { StepNavInfo, toStepNavInfo } from './to-step-nav-info';

@UntilDestroy()
@Injectable()
export class StepCardService {
    private selectStepFlowIndex$: Subject<number> = new Subject();
    private finishFormFlow$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    stepNavInfo$: Observable<StepNavInfo[]> = combineLatest([
        this.validityService.validitySteps$,
        this.stepFlowService.activeStep$,
    ]).pipe(toStepNavInfo, shareReplay(1));

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
        combineLatest([this.stepFlowService.stepFlow$, this.selectStepFlowIndex$])
            .pipe(
                map(([stepFlow, idx]) => stepFlow[idx]),
                untilDestroyed(this)
            )
            .subscribe((step) => {
                this.questionaryStateService.save();
                this.stepFlowService.navigate(step);
            });
        this.finishFormFlow$
            .pipe(
                switchMap(() => this.dialog.open(ConfirmActionDialogComponent).afterClosed()),
                filter((r) => r === 'confirm'),
                switchMapTo(claimID$),
                switchMap((claimID) => this.claimsService.getClaimByID(claimID)),
                switchMap(({ id, revision }) => this.claimsService.requestReviewClaimByID(id, revision)),
                switchMapTo(claimID$),
                untilDestroyed(this)
            )
            .subscribe((claimID) => {
                this.finishFormFlow$.complete();
                this.router.navigate(['claim-section', 'claims', claimID]);
            });
    }

    finishFormFlow() {
        this.questionaryStateService.save();
        this.finishFormFlow$.next();
    }

    selectStepFlowIndex(index: number) {
        this.selectStepFlowIndex$.next(index);
    }
}
