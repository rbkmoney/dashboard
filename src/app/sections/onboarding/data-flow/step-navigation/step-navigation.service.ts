import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { QuestionaryStateService } from '../questionary-state.service';
import { Direction, StepFlowService } from '../step-flow';
import { ValidityService } from '../validity';

@Injectable()
export class StepNavigationService {
    constructor(
        private questionaryStateService: QuestionaryStateService,
        private stepFlowService: StepFlowService,
        private validityService: ValidityService
    ) {}

    forward() {
        this.goByDirection('forward');
    }

    back() {
        this.goByDirection('back');
    }

    goByDirection(direction: Direction) {
        this.questionaryStateService.save();
        this.validityService.validateCurrentStep();
        this.validityService.isCurrentStepValid$
            .pipe(take(1))
            .subscribe(isValid => isValid && this.stepFlowService.go(direction));
    }
}
