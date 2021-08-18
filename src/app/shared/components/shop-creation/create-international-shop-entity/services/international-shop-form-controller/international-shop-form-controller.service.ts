import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { getAbstractControl } from '@dsh/app/shared/utils';
import { alpha3CountryValidator } from '@dsh/utils';

import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';
import { InternationalPayoutToolFormService } from '../international-payout-tool-form/international-payout-tool-form.service';

@Injectable()
export class InternationalShopFormControllerService {
    constructor(
        private fb: FormBuilder,
        private internationalPayoutToolFormService: InternationalPayoutToolFormService
    ) {}

    buildForm(): FormGroup<InternationalShopEntityFormValue> {
        return this.fb.group({
            shopDetails: {
                url: '',
                name: '',
                category: null,
            },
            organizationName: ['', [Validators.required]],
            tradingName: [''],
            registeredAddress: ['', [Validators.required]],
            actualAddress: [''],
            country: ['', [alpha3CountryValidator]],
            paymentInstitution: [null],
            payoutTool: this.internationalPayoutToolFormService.getForm(),
        });
    }

    addCorrespondentPayoutTool(form: FormGroup<InternationalShopEntityFormValue>): void {
        form.addControl('correspondentPayoutTool', this.internationalPayoutToolFormService.getForm());
    }

    removeCorrespondentPayoutTool(form: FormGroup<InternationalShopEntityFormValue>): void {
        form.removeControl('correspondentPayoutTool');
    }

    getPayoutTool(form: FormGroup<InternationalShopEntityFormValue>): FormGroup<InternationalBankAccountFormValue> {
        return getAbstractControl<FormGroup<InternationalBankAccountFormValue>>(form, 'payoutTool');
    }

    getCorrespondentPayoutTool(
        form: FormGroup<InternationalShopEntityFormValue>
    ): FormGroup<InternationalBankAccountFormValue> {
        return getAbstractControl<FormGroup<InternationalBankAccountFormValue>>(form, 'correspondentPayoutTool');
    }
}
