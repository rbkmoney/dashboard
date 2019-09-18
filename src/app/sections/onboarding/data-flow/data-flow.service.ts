import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { takeRouteParam } from '../../../custom-operators/take-route-param';
import { ClaimsService } from '../../../api/claims';
import { StepName, IndividualEntityStepFlow } from './step-flows';

const getBaseUrl = (url: string, nesting = 2): string[] => url.split('/').splice(0, nesting);

const getInitialStep = (url: string): StepName => {
    const source = url.split('/');
    const result = source[source.length - 1] as StepName;
    if (!Object.values(StepName).includes(result)) {
        throw new Error(`Url fragment: ${result} is not StepName`);
    }
    return result;
};

@Injectable()
export class DataFlowService {
    stepFlow$: Observable<StepName[]>;
    activeStep$: Observable<StepName> = of(getInitialStep(this.router.url));

    private baseUrl = getBaseUrl(this.router.url);
    private navigate$: Subject<StepName> = new Subject();

    constructor(private router: Router, private route: ActivatedRoute, private claimService: ClaimsService) {
        this.stepFlow$ = this.route.params.pipe(
            takeRouteParam('claimID'),
            switchMap(claimID => this.claimService.getClaimByID(claimID)),
            map(() => IndividualEntityStepFlow) // TODO implement here,
        );

        let stepAcc;
        this.activeStep$ = this.navigate$.pipe(
            tap(step => (stepAcc = step)),
            switchMap(step => this.router.navigate([...this.baseUrl, step])),
            map(() => stepAcc)
        );
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }
}
