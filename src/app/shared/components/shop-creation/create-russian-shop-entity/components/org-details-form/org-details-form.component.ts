import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
    createTypeUnionDefaultForm,
    TypeUnion,
} from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { ValidatedWrappedAbstractControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { ExistingContractForm } from '../../../existing-contract-form/existing-contract-form.component';
import { NewContractorForm } from './../new-contractor-form/new-contractor-form.component';

export type OrgDetailsForm = TypeUnion<ExistingContractForm<'RussianLegalEntity'>, NewContractorForm>;

@UntilDestroy()
@Component({
    selector: 'dsh-org-details-form',
    templateUrl: 'org-details-form.component.html',
    providers: createValidatedAbstractControlProviders(OrgDetailsFormComponent),
})
export class OrgDetailsFormComponent extends ValidatedWrappedAbstractControlSuperclass<OrgDetailsForm> {
    formControl = createTypeUnionDefaultForm<ExistingContractForm<'RussianLegalEntity'>, NewContractorForm>();

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
