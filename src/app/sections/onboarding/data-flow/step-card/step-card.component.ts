import { Component, Output, EventEmitter, Input } from '@angular/core';

import { StepName } from '../step-flows';

@Component({
    selector: 'dsh-step-card',
    templateUrl: 'step-card.component.html'
})
export class StepCardComponent {
    @Input() stepFlow: StepName[];
    @Input() activeStep: StepName;
    @Output() stepSelected = new EventEmitter<StepName>();

    @Input() actionDisabled = true;
    @Output() doAction = new EventEmitter<void>();

    selectStepFlowIndex(index: number) {
        this.stepSelected.emit(this.stepFlow[index]);
    }
}
