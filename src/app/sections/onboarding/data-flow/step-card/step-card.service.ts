import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepFlowService } from '../step-flow';
import { QuestionaryStateService } from '../questionary-state.service';
import { toBaseUrl } from '../to-base-url';

@Injectable()
export class StepCardService {
    private selectStepFlowIndex$: Subject<number> = new Subject();

    constructor(
        private stepFlowService: StepFlowService,
        private questionaryStateService: QuestionaryStateService,
        private router: Router
    ) {
        combineLatest(this.selectStepFlowIndex$, this.stepFlowService.stepFlow$)
            .pipe(map(([i, stepFlow]) => stepFlow[i]))
            .subscribe(step => {
                this.questionaryStateService.save();
                this.stepFlowService.navigate(step);
            });
    }

    finishFormFlow() {
        this.questionaryStateService.save();
        // TODO need change claim status to review
        this.router.navigate([...toBaseUrl(this.router.url), 'document-upload']);
    }

    selectStepFlowIndex(index: number) {
        this.selectStepFlowIndex$.next(index);
    }
}
