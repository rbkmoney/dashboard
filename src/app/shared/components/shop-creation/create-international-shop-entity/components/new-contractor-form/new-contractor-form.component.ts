import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import {
    createValidatedAbstractControlProviders,
    ValidatedWrappedAbstractControlSuperclass,
    RequiredSuper,
} from '@dsh/utils';

import { IntegrationsEnum } from '../../../../../../integration';
import { ContractorForm } from '../../types/contractor-form';

@UntilDestroy()
@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(NewContractorFormComponent),
})
export class NewContractorFormComponent
    extends ValidatedWrappedAbstractControlSuperclass<ContractorForm>
    implements OnInit
{
    @Input() integration?: IntegrationsEnum;

    formControl = this.fb.group<ContractorForm>({
        registeredNumber: '',
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        country: '',
    });

    get showRegisteredNumber(): boolean {
        return this.integration === IntegrationsEnum.Xpay;
    }

    get hideCountry(): boolean {
        return this.integration === IntegrationsEnum.Xpay;
    }

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        if (this.integration === IntegrationsEnum.Xpay) {
            this.formControl.controls['country'].patchValue('BYN');
        }
        return super.ngOnInit();
    }
}
