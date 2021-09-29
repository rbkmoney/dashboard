import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedWrappedAbstractControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { MainFiltersForm } from './types/main-filters-form';

@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(MainFiltersComponent),
})
export class MainFiltersComponent extends ValidatedWrappedAbstractControlSuperclass<MainFiltersForm> {
    formControl = this.fb.group<MainFiltersForm>({
        payerEmail: ['', Validators.email],
        customerID: [''],
        rrn: ['', Validators.pattern(new RegExp(/^\d+$/))],
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
