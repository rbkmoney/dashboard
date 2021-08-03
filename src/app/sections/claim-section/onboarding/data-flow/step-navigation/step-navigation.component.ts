import { Component } from '@angular/core';

import { StepFlowService } from '../step-flow';
import { StepNavigationService } from './step-navigation.service';

@Component({
    selector: 'dsh-step-navigation',
    templateUrl: 'step-navigation.component.html',
    providers: [StepNavigationService],
})
export class StepNavigationComponent {
    hasNextStep$ = this.stepFlowService.hasNextStep$;
    hasPreviousStep$ = this.stepFlowService.hasPreviousStep$;

    constructor(private stepNavigationService: StepNavigationService, private stepFlowService: StepFlowService) {}

    back() {
        this.stepNavigationService.back();
    }

    forward() {
        this.stepNavigationService.forward();
    }
}
