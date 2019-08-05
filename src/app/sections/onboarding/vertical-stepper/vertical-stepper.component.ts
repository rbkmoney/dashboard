import { Component, HostBinding, Input } from '@angular/core';

import { Stepper } from '../stepper/stepper';
import { Step } from './stepper-item/stepper-item.component';

@Component({
    selector: 'dsh-vertical-stepper',
    templateUrl: 'vertical-stepper.component.html',
    styleUrls: ['vertical-stepper.component.scss']
})
export class VerticalStepperComponent extends Stepper {
    @HostBinding('class.dsh-vertical-stepper')
    className = true;
}
