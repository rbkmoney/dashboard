import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { PaymentSearchFormValue } from './payment-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import {
    tokenProviders as tokenProvidersConsts,
    paymentMethods as paymentMethodsConsts,
    bankCardPaymentSystems as bankCardPaymentSystemsConsts,
    paymentFlows as paymentFlowsConsts,
    paymentStatuses as paymentStatusesConsts
} from '../../constants';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<PaymentSearchFormValue> = new EventEmitter<PaymentSearchFormValue>();

    searchForm: FormGroup;
    expanded = false;
    shopsInfo$ = this.searchFormService.shopsInfo$;
    tokenProviders;
    paymentMethods;
    bankCardPaymentSystems;
    paymentFlows;
    paymentStatuses;

    constructor(private searchFormService: SearchFormService) {
        this.tokenProviders = tokenProvidersConsts;
        this.paymentMethods = paymentMethodsConsts;
        this.bankCardPaymentSystems = bankCardPaymentSystemsConsts;
        this.paymentFlows = paymentFlowsConsts;
        this.paymentStatuses = paymentStatusesConsts;
    }

    ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.searchFormService.formValueChanges(this.valueDebounceTime).subscribe(v => this.formValueChanges.emit(v));
    }

    selectDaterange(v: SearchFormValue) {
        this.searchFormService.applySearchFormValue(v);
    }

    reset() {
        this.searchFormService.reset();
    }
}
