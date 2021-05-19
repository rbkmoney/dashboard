import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import isEqual from 'lodash-es/isEqual';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: 'invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends FormControlSuperclass<string[]> {
    formControl = new FormControl();
    value: string[] = [];

    constructor(injector: Injector) {
        super(injector);
    }

    handleIncomingValue(value: string[]): void {
        this.formControl.setValue(value);
    }

    save(): void {
        if (!isEqual(this.value, this.formControl.value)) {
            this.value = this.formControl.value;
            this.emitOutgoingValue(this.value);
        }
    }

    clear(): void {
        this.formControl.setValue([]);
    }
}
