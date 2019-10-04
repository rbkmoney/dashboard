import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DataFlowService } from '../data-flow.service';
import { handleNull } from '../../../../custom-operators';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { toInitialStep } from './to-initial-step';
import { mapToStepFlow } from './map-to-step-flow';
import { StepName } from './step-name';

@Injectable()
export class StepFlowService {
    private navigate$: Subject<StepName> = new Subject();
    private activeStepState$: Subject<StepName | null> = new BehaviorSubject(toInitialStep(this.router.url));

    stepFlow$: Observable<StepName[]>;
    activeStep$: Observable<StepName> = this.activeStepState$.pipe(
        handleNull('Active step calculation failed'),
        filter(s => s !== null)
    );

    constructor(private router: Router, private dataFlowService: DataFlowService) {
        this.stepFlow$ = this.dataFlowService.questionary$.pipe(mapToStepFlow);
        this.navigate$
            .pipe(mapToNavigateCommands(this.router.url))
            .subscribe(({ commands, step }) =>
                this.router.navigate(commands).then(() => this.activeStepState$.next(step))
            );
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }
}
