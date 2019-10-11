import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { InvoiceSearchFormValue } from './invoice-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';
import {
    paymentStatuses as paymentStatusesConsts,
    tokenProviders as tokenProvidersConsts,
    paymentMethods as paymentMethodsConsts,
    bankCardPaymentSystems as bankCardPaymentSystemsConsts,
    paymentFlows as paymentFlowsConsts
} from '../../constants';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<InvoiceSearchFormValue> = new EventEmitter<InvoiceSearchFormValue>();

    searchForm: FormGroup;
    expanded = false;
    statuses: Invoice.StatusEnum[] = ['unpaid', 'cancelled', 'paid', 'fulfilled'];
    shopsInfo$ = this.searchFormService.shopsInfo$;
    paymentStatuses;
    tokenProviders;
    paymentMethods;
    bankCardPaymentSystems;
    paymentFlows;

    constructor(private searchFormService: SearchFormService) {
        this.paymentStatuses = paymentStatusesConsts;
        this.tokenProviders = tokenProvidersConsts;
        this.paymentMethods = paymentMethodsConsts;
        this.bankCardPaymentSystems = bankCardPaymentSystemsConsts;
        this.paymentFlows = paymentFlowsConsts;
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
