import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedWrappedAbstractControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { InvoicesFilterForm } from './types';

@Component({
    selector: 'dsh-invoices-filter',
    templateUrl: './invoices-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(InvoicesFilterComponent),
})
export class InvoicesFilterComponent extends ValidatedWrappedAbstractControlSuperclass<InvoicesFilterForm> {
    formControl = this.fb.group<InvoicesFilterForm>({
        invoiceIDs: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
