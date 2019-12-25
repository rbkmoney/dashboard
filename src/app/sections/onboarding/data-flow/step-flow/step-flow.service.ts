import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

import { StepName } from './step-name';
import { handleNull } from '../../../../custom-operators';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { mapToStepFlow } from './map-to-step-flow';
import { mapDirectionToStep } from './map-direction-to-step';
import { mapToHasNext } from './map-to-has-next';
import { mapToHasPrevious } from './map-to-has-previous';
import { urlToStep } from './url-to-step';
import { QuestionaryStateService } from '../questionary-state.service';

@Injectable()
export class StepFlowService {
    private navigate$: Subject<StepName> = new Subject();
    private goByDirection$: Subject<'forward' | 'back'> = new Subject();
    private readonly defaultStep = StepName.BasicInfo;
    private subs: Subscription[];

    stepFlow$: Observable<StepName[]> = this.questionaryStateService.questionaryData$.pipe(
        mapToStepFlow,
        handleNull('Step flow initialization failed'),
        shareReplay(1)
    );

    activeStep$: Observable<StepName> = this.navigate$.pipe(
        startWith(urlToStep(this.router.url, this.defaultStep)),
        shareReplay(1)
    );

    hasNextStep$: Observable<boolean> = this.activeStep$.pipe(
        mapToHasNext(this.stepFlow$),
        shareReplay(1)
    );

    hasPreviousStep$: Observable<boolean> = this.activeStep$.pipe(
        mapToHasPrevious(this.stepFlow$),
        shareReplay(1)
    );

    constructor(private router: Router, private questionaryStateService: QuestionaryStateService) {}

    initialize() {
        const navigateSub = this.navigate$
            .pipe(mapToNavigateCommands(this.router.url))
            .subscribe(commands => this.router.navigate(commands));
        const goByDirectionSub = this.goByDirection$
            .pipe(mapDirectionToStep(this.stepFlow$, this.activeStep$))
            .subscribe(step => this.navigate$.next(step));
        this.subs = [navigateSub, goByDirectionSub];
    }

    unsubscribe() {
        for (const sub of this.subs) {
            sub.unsubscribe();
        }
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }

    go(direction: 'forward' | 'back') {
        this.goByDirection$.next(direction);
    }

    preserveDefault() {
        if (urlToStep(this.router.url, null) !== null) {
            return;
        }
        this.router.navigate([this.router.url, this.defaultStep]);
    }
}
