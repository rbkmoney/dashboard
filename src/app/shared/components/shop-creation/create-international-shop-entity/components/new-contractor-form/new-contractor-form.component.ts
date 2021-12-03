import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { IntegrationsEnum } from '../../../../../../integration';
import { ContractorForm } from '../../types/contractor-form';

@UntilDestroy()
@Component({
    selector: 'dsh-new-contractor-form',
    templateUrl: 'new-contractor-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(NewContractorFormComponent),
})
export class NewContractorFormComponent extends ValidatedWrappedAbstractControlSuperclass<ContractorForm> {
    @Input() integration?: IntegrationsEnum;

    formControl = this.fb.group<ContractorForm>({
        registeredNumber: '',
        organizationName: '',
        tradingName: '',
        registeredAddress: '',
        actualAddress: '',
        country: this.country,
    });

    get showRegisteredNumber(): boolean {
        return this.integration === IntegrationsEnum.Xpay;
    }

    get hideCountry(): boolean {
        return this.integration === IntegrationsEnum.Xpay;
    }

    private get country(): string {
        return this.integration === IntegrationsEnum.Xpay ? 'BYN' : '';
    }

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
