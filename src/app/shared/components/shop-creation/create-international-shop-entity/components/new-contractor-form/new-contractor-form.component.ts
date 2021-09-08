import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder, FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
    alpha3CountryValidator,
    createValidatedAbstractControlProviders,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

export interface NewContractorForm {
    organizationName: string;
    tradingName: string;
    registeredAddress: string;
    actualAddress: string;
    country: string;
}

@UntilDestroy()
@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(NewContractorFormComponent),
})
export class NewContractorFormComponent extends ValidatedWrappedAbstractControlSuperclass<NewContractorForm> {
    formControl = this.fb.group<NewContractorForm>({
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        country: ['', [alpha3CountryValidator]],
    });
    searchControl = new FormControl<string>('');

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
