import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { PaymentSearchFormValue } from './payment-search-form-value';
import { SearchFormValue } from '../../search-form-value';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<PaymentSearchFormValue> = new EventEmitter<PaymentSearchFormValue>();

    localeBaseDir = 'sections.operations.payments.filter';
    searchForm: FormGroup;
    expanded = false;
    statuses: string[] = ['pending', 'processed', 'captured', 'cancelled', 'refunded', 'failed'];
    flows: string[] = ['instant', 'hold'];
    methods: string[] = ['bankCard', 'paymentTerminal'];
    tokenProviders: string[] = ['applepay', 'googlepay', 'samsungpay'];
    bankCardPaymentSystems: string[] = [
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

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.formValueChanges.emit(this.searchForm.value);
        this.searchFormService.formValueChanges(this.valueDebounceTime).subscribe(v => this.formValueChanges.emit(v));
    }

    selectDaterange(v: SearchFormValue) {
        this.searchFormService.applySearchFormValue(v);
    }

    reset() {
        this.formValueChanges.emit(this.searchFormService.reset());
    }
}
