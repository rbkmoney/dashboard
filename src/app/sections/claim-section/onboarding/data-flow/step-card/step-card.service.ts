import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, switchMapTo, withLatestFrom } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';
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
        private validityService: ValidityService,
        private contextService: ContextService
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
                withLatestFrom(this.contextService.organization$),
                switchMap(([claimID, org]) =>
                    this.claimsService.getClaimByID(org.id, claimID).pipe(map((claim) => [claim, org.id] as const))
                ),
                switchMap(([{ id, revision }, orgId]) =>
                    this.claimsService.requestReviewClaimByID(orgId, id, revision)
                ),
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
