import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { ValidatedWrappedAbstractControlSuperclass, createValidatedAbstractControlProviders } from '@dsh/utils';

import { PaymentSumFilterForm } from './types/payment-sum-filter-form';

@Component({
    selector: 'dsh-payment-sum-filter',
    templateUrl: './payment-sum-filter.component.html',
    providers: createValidatedAbstractControlProviders(PaymentSumFilterComponent),
})
export class PaymentSumFilterComponent extends ValidatedWrappedAbstractControlSuperclass<PaymentSumFilterForm> {
    formControl = this.fb.group<PaymentSumFilterForm>({
        paymentAmountFrom: null,
        paymentAmountTo: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
