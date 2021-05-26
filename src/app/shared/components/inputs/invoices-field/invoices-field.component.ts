import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

@Component({
    selector: 'dsh-invoices-field',
    templateUrl: 'invoices-field.component.html',
    providers: [provideValueAccessor(InvoicesFieldComponent)],
})
export class InvoicesFieldComponent extends WrappedFormControlSuperclass<string[]> {
    constructor(injector: Injector) {
        super(injector);
    }
}
