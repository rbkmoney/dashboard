import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, of, Subject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { QuestionaryStateService } from '../questionary-state.service';
import { Direction, StepFlowService } from '../step-flow';
import { ValidationCheckService } from '../validation-check';
import { ValidityService } from '../validity';

@UntilDestroy()
@Injectable()
export class StepNavigationService {
    private goByDirection$ = new Subject<Direction>();

    constructor(
        private questionaryStateService: QuestionaryStateService,
        private stepFlowService: StepFlowService,
        private validityService: ValidityService,
        private validationCheckService: ValidationCheckService
    ) {
        this.goByDirection$
            .pipe(
                tap(() => this.questionaryStateService.save()),
                switchMap((direction) =>
                    combineLatest([of(direction), this.validityService.isCurrentStepValid$.pipe(take(1))])
                ),
                untilDestroyed(this)
            )
            .subscribe(([direction, isValid]) => {
                if (!isValid) {
                    this.validationCheckService.validationCheck();
                }
                if (direction === 'back' || isValid) {
                    this.stepFlowService.go(direction);
                }
            });
    }

    forward() {
        this.goByDirection$.next('forward');
    }

    back() {
        this.goByDirection$.next('back');
    }
}
