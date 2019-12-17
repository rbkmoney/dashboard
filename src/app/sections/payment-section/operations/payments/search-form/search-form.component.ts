import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
    tokenProviders = tokenProvidersConsts;
    paymentMethods = paymentMethodsConsts;
    bankCardPaymentSystems = bankCardPaymentSystemsConsts;
    paymentFlows = paymentFlowsConsts;
    paymentStatuses = paymentStatusesConsts;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe(v => this.formValueChanges.emit(v));
    }

    selectDaterange(v: SearchFormValue) {
        this.searchFormService.applySearchFormValue(v);
    }

    reset() {
        this.searchFormService.reset();
    }
}
