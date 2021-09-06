import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';

import { InternationalPayoutToolFormService } from '@dsh/app/shared/components/shop-creation/create-international-shop-entity/services/international-payout-tool-form/international-payout-tool-form.service';
import {
    alpha3CountryValidator,
    createValidatedAbstractControlProviders,
    ValidatedWrappedAbstractControlSuperclass,
} from '@dsh/utils';

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
        organizationName: ['', [Validators.required]],
        tradingName: [''],
        registeredAddress: ['', [Validators.required]],
        actualAddress: [''],
        country: ['', [alpha3CountryValidator]],
        paymentInstitution: [null],
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
