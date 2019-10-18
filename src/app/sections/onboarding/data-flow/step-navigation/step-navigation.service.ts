import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QuestionaryStateService } from '../questionary-state.service';
import { StepFlowService } from '../step-flow';

@Injectable()
export class StepNavigationService {
    private goByDirection$: Subject<'forward' | 'back'> = new Subject();

    constructor(private questionaryStateService: QuestionaryStateService, private stepFlowService: StepFlowService) {
        this.goByDirection$
            .pipe(tap(() => this.questionaryStateService.save()))
            .subscribe(direction => this.stepFlowService.go(direction));
    }

    forward() {
        this.goByDirection$.next('forward');
    }

    back() {
        this.goByDirection$.next('back');
    }
}
