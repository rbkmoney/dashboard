import { Component, Input } from '@angular/core';
import random from 'lodash.random';

import { slateblue400 } from '../theme-manager';

@Component({
    selector: 'dsh-spinner',
    templateUrl: 'spinner.component.html'
})
export class SpinnerComponent {
    @Input() animationDuration = 1000;
    @Input() size = 50;
    activeSpinner = 1;
    spinnersCount = 11;
    color = slateblue400;

    constructor() {
        this.activeSpinner = random(1, this.spinnersCount);
    }
}
