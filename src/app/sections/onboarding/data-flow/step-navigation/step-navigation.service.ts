import { Injectable } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { filter, pluck, switchMap, take, tap } from 'rxjs/operators';

import { QuestionaryStateService } from '../questionary-state.service';
import { Direction, StepFlowService } from '../step-flow';
import { ValidationCheckService } from '../validation-check';
import { ValidityService } from '../validity';

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
                switchMap(direction =>
                    combineLatest([of(direction), this.validityService.isCurrentStepValid$.pipe(take(1))])
                ),
                filter(([direction, isValid]) => direction === 'back' || isValid),
                pluck(0)
            )
            .subscribe(direction => this.stepFlowService.go(direction));
    }

    forward() {
        this.goByDirection$.next('forward');
    }

    back() {
        this.goByDirection$.next('back');
    }
}
