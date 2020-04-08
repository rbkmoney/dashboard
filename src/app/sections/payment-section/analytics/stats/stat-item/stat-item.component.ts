import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { StatData } from '../../utils';

@Component({
    selector: 'dsh-stat-item',
    templateUrl: './stat-item.component.html'
})
export class StatItemComponent {
    @Input() spinnerType: SpinnerType;
    @Input() subtitle: string;
    @Input() statData: StatData;
    @Input() isLoading: boolean;
    @Input() error: Error;

    protected _hideCurrency = false;
    @Input()
    get hideCurrency(): boolean {
        return this._hideCurrency;
    }
    set hideCurrency(value: boolean) {
        this._hideCurrency = coerceBooleanProperty(value);
    }
}
