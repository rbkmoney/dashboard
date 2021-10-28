import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { PayoutToolForm } from '@dsh/app/shared/components/shop-creation/create-international-shop-entity/components/payout-tool-form/payout-tool-form.component';
import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

export interface InternationalBankAccountForm {
    payoutTool: PayoutToolForm;
    currency: string;
    correspondentPayoutTool?: PayoutToolForm;
}

@Component({
    selector: 'dsh-international-bank-account-form',
    templateUrl: 'international-bank-account-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(InternationalBankAccountFormComponent),
})
export class InternationalBankAccountFormComponent extends ValidatedWrappedAbstractControlSuperclass<InternationalBankAccountForm> {
    formControl = this.fb.group<InternationalBankAccountForm>({
        payoutTool: null,
        currency: '',
        correspondentPayoutTool: { value: null, disabled: true },
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    toggleCorrespondentPayoutTool(): void {
        const { correspondentPayoutTool } = this.formControl.controls;
        if (correspondentPayoutTool.disabled) correspondentPayoutTool.enable();
        else correspondentPayoutTool.disable();
    }
}
