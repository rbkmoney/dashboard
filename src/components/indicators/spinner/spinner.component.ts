import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import random from 'lodash.random';

import { SpinnerThemeProvider, SPINNER_THEME } from './spinner-theme';
import { SpinnerType } from './spinner-type';

@Component({
    selector: 'dsh-spinner',
    templateUrl: 'spinner.component.html',
})
export class SpinnerComponent implements OnChanges {
    @Input() type: SpinnerType;
    @Input() animationDuration = 1000;
    @Input() size = 50;
    activeSpinner = SpinnerType.Spring;
    spinnersCount = 7;
    color = this.theme.color;

    SpinnerType = SpinnerType;

    constructor(@Inject(SPINNER_THEME) private theme: SpinnerThemeProvider) {}

    ngOnChanges({ type }: SimpleChanges) {
        this.activeSpinner = type && type.currentValue ? type.currentValue : random(0, this.spinnersCount);
    }
}
