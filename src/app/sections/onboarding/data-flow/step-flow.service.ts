import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { StepName, IndividualEntityStepFlow } from './step-flows';
import { DataFlowService } from './data-flow.service';

const toBaseUrl = (url: string, nesting = 3): string[] => url.split('/').splice(0, nesting);

const getInitialStep = (url: string): StepName => {
    const source = url.split('/');
    const result = source[source.length - 1] as StepName;
    if (!Object.values(StepName).includes(result)) {
        throw new Error(`Url fragment: ${result} is not StepName`);
    }
    return result;
};

@Injectable()
export class StepFlowService {
    stepFlow$: Observable<StepName[]>;
    activeStep$: Observable<StepName>;

    private navigate$: Subject<StepName> = new Subject();

    constructor(private router: Router, private dataFlowService: DataFlowService) {
        this.stepFlow$ = this.dataFlowService.questionary$.pipe(
            map(() => IndividualEntityStepFlow) // TODO implement here
        );

        const baseUrl = toBaseUrl(this.router.url);
        this.activeStep$ = this.navigate$.pipe(
            startWith(getInitialStep(this.router.url)),
            switchMap(step => this.router.navigate([...baseUrl, step]).then(() => step))
        );
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }
}
