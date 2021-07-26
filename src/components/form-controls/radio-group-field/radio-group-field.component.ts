import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { Overwrite } from 'utility-types';

import { Option } from './types/option';

@Component({
    selector: 'dsh-radio-group-field',
    templateUrl: 'radio-group-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(RadioGroupFieldComponent)],
})
export class RadioGroupFieldComponent<T> extends FormControlSuperclass<T> {
    @Input() options: Option<T>[];

    selected: T;

    constructor(injector: Injector) {
        super(injector);
    }

    handleIncomingValue(value: T): void {
        this.selected = value;
    }

    select({ value }: Overwrite<MatRadioChange, { value: T }>): void {
        this.selected = value;
        this.emitOutgoingValue(this.selected);
        this.onTouched();
    }
}
