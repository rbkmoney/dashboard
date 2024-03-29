import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, shareReplay, startWith, tap } from 'rxjs/operators';

import { handleNull } from '../../../../../custom-operators';
import { QuestionaryStateService } from '../questionary-state.service';
import { mapDirectionToStep } from './map-direction-to-step';
import { mapToHasNext } from './map-to-has-next';
import { mapToHasPrevious } from './map-to-has-previous';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { mapToStepFlow } from './map-to-step-flow';
import { StepName } from './step-name';
import { urlToStep } from './url-to-step';

export type Direction = 'forward' | 'back';

@Injectable()
export class StepFlowService {
    private navigate$: Subject<StepName> = new Subject();
    private goByDirection$: Subject<Direction> = new Subject();
    private readonly defaultStep = StepName.BasicInfo;
    private sub: Subscription = Subscription.EMPTY;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    stepFlow$: Observable<StepName[]> = this.questionaryStateService.questionaryData$.pipe(
        mapToStepFlow,
        handleNull('Step flow initialization failed'),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    activeStep$: Observable<StepName> = this.navigate$.pipe(
        startWith(urlToStep(this.router.url, this.defaultStep)),
        distinctUntilChanged(),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    hasNextStep$: Observable<boolean> = this.activeStep$.pipe(mapToHasNext(this.stepFlow$), shareReplay(1));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    hasPreviousStep$: Observable<boolean> = this.activeStep$.pipe(mapToHasPrevious(this.stepFlow$), shareReplay(1));

    constructor(private router: Router, private questionaryStateService: QuestionaryStateService) {}

    subscribe() {
        const navigate$ = this.navigate$.pipe(
            mapToNavigateCommands(this.router.url),
            tap((commands) => this.router.navigate(commands))
        );
        const goByDirection$ = this.goByDirection$.pipe(
            mapDirectionToStep(this.stepFlow$, this.activeStep$),
            tap((step) => this.navigate$.next(step))
        );
        this.sub = merge(navigate$, goByDirection$).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }

    go(direction: Direction) {
        this.goByDirection$.next(direction);
    }
}
