import { Component } from '@angular/core';

import { DataFlowService } from './data-flow.service';
import { StepName } from './step-flows';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [DataFlowService]
})
export class DataFlowComponent {
    title = 'Основные сведения';

    stepFlow$ = this.dataFlowService.stepFlow$;
    activeStep$ = this.dataFlowService.activeStep$;

    constructor(private dataFlowService: DataFlowService) {}

    stepSelected(step: StepName) {
        this.dataFlowService.navigate(step);
    }
}
