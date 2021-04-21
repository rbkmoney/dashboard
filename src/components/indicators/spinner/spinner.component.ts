import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import random from 'lodash-es/random';

import { ThemeManager, ThemeName } from '../../../app/theme-manager';
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

    // eslint-disable-next-line @typescript-eslint/naming-convention
    SpinnerType = SpinnerType;

    constructor(private themeManager: ThemeManager) {}

    get color() {
        switch (this.themeManager.current) {
            case ThemeName.PersianGreen:
                return '#003b8e';
            case ThemeName.Main:
                return '#695bff';
        }
    }

    ngOnChanges({ type }: SimpleChanges) {
        this.activeSpinner = type && type.currentValue ? type.currentValue : random(0, this.spinnersCount);
    }
}
