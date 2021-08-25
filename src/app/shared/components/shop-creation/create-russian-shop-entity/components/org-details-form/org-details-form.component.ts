import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
    RequiredSuper,
    ValidatedWrappedAbstractControlSuperclass,
    createValidatedAbstractControlProviders,
    getFormValueChanges,
    switchControl,
} from '@dsh/utils';

import { ContractForm } from './../existing-contract-form/existing-contract-form.component';
import { NewContractorForm } from './../new-contractor-form/new-contractor-form.component';

enum Type {
    New,
    Existing,
}

export interface OrgDetailsForm {
    type: Type;
    contract: ContractForm;
    newContractor: NewContractorForm;
}

@UntilDestroy()
@Component({
    selector: 'dsh-org-details-form',
    templateUrl: 'org-details-form.component.html',
    providers: createValidatedAbstractControlProviders(OrgDetailsFormComponent),
})
export class OrgDetailsFormComponent
    extends ValidatedWrappedAbstractControlSuperclass<OrgDetailsForm>
    implements OnInit
{
    formControl = this.fb.group<OrgDetailsForm>({
        type: null,
        contract: null,
        newContractor: null,
    });
    type = Type;

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        const { contract, newContractor } = this.formControl.controls;
        getFormValueChanges(this.formControl.controls.type)
            .pipe(untilDestroyed(this))
            .subscribe((type) =>
                switchControl(type, [
                    [Type.New, newContractor],
                    [Type.Existing, contract],
                ])
            );
        return super.ngOnInit();
    }
}
