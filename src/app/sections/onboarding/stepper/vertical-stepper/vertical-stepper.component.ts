import { Component, HostBinding } from '@angular/core';

import { Stepper } from '../stepper';

@Component({
    selector: 'dsh-vertical-stepper',
    templateUrl: 'vertical-stepper.component.html',
    styleUrls: ['vertical-stepper.component.scss']
})
export class VerticalStepperComponent extends Stepper {
    @HostBinding('class.dsh-vertical-stepper')
    className = true;
}
