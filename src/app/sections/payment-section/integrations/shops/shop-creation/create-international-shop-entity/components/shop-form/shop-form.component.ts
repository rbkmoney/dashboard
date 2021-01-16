import { Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { InternationalShopFormControllerService } from '../../services/international-shop-form-controller/international-shop-form-controller.service';
import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
})
export class ShopFormComponent {
    @Input() form: FormGroup<InternationalShopEntityFormValue>;

    hasCorrespondentAccount = false;

    get payoutTool(): FormGroup<InternationalBankAccountFormValue> {
        return this.formController.getPayoutTool(this.form);
    }

    get correspondentPayoutTool(): FormGroup<InternationalBankAccountFormValue> {
        return this.formController.getCorrespondentPayoutTool(this.form);
    }

    constructor(private formController: InternationalShopFormControllerService) {}

    onCorrespondentAccountChange(value: boolean): void {
        if (value) {
            this.formController.addCorrespondentPayoutTool(this.form);
        } else {
            this.formController.removeCorrespondentPayoutTool(this.form);
        }
        this.hasCorrespondentAccount = value;
    }
}
