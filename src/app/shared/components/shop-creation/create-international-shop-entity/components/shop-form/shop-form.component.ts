import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createTypeUnionDefaultForm } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { InternationalPayoutToolFormService } from '../../services/international-payout-tool-form/international-payout-tool-form.service';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<InternationalShopEntityFormValue> {
    formControl = this.fb.group<InternationalShopEntityFormValue>({
        shopDetails: null,
        orgDetails: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        payoutTool: this.internationalPayoutToolFormService.getForm(),
    });
    hasCorrespondentAccount = false;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private internationalPayoutToolFormService: InternationalPayoutToolFormService
    ) {
        super(injector);
    }

    onCorrespondentAccountChange(value: boolean): void {
        if (value) {
            this.formControl.addControl('correspondentPayoutTool', this.internationalPayoutToolFormService.getForm());
        } else {
            this.formControl.removeControl('correspondentPayoutTool');
        }
        this.hasCorrespondentAccount = value;
    }
}
