import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoicesFilterComponent)],
})
export class InvoicesFilterComponent extends WrappedFormControlSuperclass<string[]> {
    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
