import { Injectable } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { QuestionaryStateService } from '../questionary-state.service';
import { Direction, StepFlowService } from '../step-flow';
import { ValidationCheckService } from '../validation-check';
import { ValidityService } from '../validity';

@Injectable()
export class StepNavigationService {
    constructor(
        private questionaryStateService: QuestionaryStateService,
        private stepFlowService: StepFlowService,
        private validityService: ValidityService,
        private validationCheckService: ValidationCheckService
    ) {}

    forward() {
        this.goByDirection('forward');
    }

    back() {
        this.goByDirection('back');
    }

    goByDirection(direction: Direction) {
        this.questionaryStateService.save();
        if (direction === 'forward') {
            this.validationCheckService.validationCheck();
        }
        this.validityService.isCurrentStepValid$
            .pipe(
                take(1),
                filter(isValid => isValid)
            )
            .subscribe(() => this.stepFlowService.go(direction));
    }
}
