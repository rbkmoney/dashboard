import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { StatData } from '../utils';

@Component({
    selector: 'dsh-stat-item',
    templateUrl: './stat-item.component.html',
    styleUrls: ['./stat-item.component.scss']
})
export class StatItemComponent implements OnChanges {
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes.statData?.currentValue) {
            this.error = undefined;
        }
    }
}
