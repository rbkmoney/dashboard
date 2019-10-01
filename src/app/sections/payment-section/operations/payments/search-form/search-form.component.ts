import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { PaymentSearchFormValue } from './payment-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import {
    BankCardPaymentSystem,
    BankCardTokenProvider,
    PaymentStatus
} from '../../../../../api-codegen/capi/swagger-codegen';

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
    statuses: PaymentStatus.StatusEnum[] = ['pending', 'processed', 'captured', 'cancelled', 'refunded', 'failed'];
    flows = ['instant', 'hold'] as const;
    methods = ['bankCard', 'paymentTerminal'] as const;
    tokenProviders: BankCardTokenProvider[] = ['applepay', 'googlepay', 'samsungpay'];
    bankCardPaymentSystems: BankCardPaymentSystem[] = [
        'visa',
        'mastercard',
        'visaelectron',
        'maestro',
        'forbrugsforeningen',
        'dankort',
        'amex',
        'dinersclub',
        'discover',
        'unionpay',
        'jcb',
        'nspkmir'
    ];
    shopsInfo$ = this.searchFormService.shopsInfo$;

    constructor(private searchFormService: SearchFormService) {}

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
