import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import * as moment from 'moment';

import { SearchFormService } from './search-form.service';
import { PAYMENT_STATUS } from '../payment-status';
import { PAYMENT_FLOW } from '../payment-flow';
import { PAYMENT_METHOD } from '../payment-method';
import { BANK_CARD_TOKEN_PROVIDER } from '../bank-card-token-provider';
import { BANK_CARD_PAYMENT_SYSTEM } from '../bank-card-payment-system';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    styleUrls: ['search-form.component.scss'],
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    search: EventEmitter<any> = new EventEmitter<any>();

    localeBaseDir = 'sections.operations.payments.filter'

    searchForm: FormGroup;
    expanded = false;

    statuses: string[];
    flows: string[];
    methods: string[];
    tokenProviders: string[];
    bankCardPaymentSystems: string[];

    constructor(private searchFormService: SearchFormService) {
    }

    ngOnInit(): void {
        this.statuses = Object.values(PAYMENT_STATUS);
        this.flows = Object.values(PAYMENT_FLOW);
        this.methods = Object.values(PAYMENT_METHOD);
        this.tokenProviders = Object.values(BANK_CARD_TOKEN_PROVIDER);
        this.bankCardPaymentSystems = Object.values(BANK_CARD_PAYMENT_SYSTEM);
        this.searchForm = this.searchFormService.searchForm;
        this.search.emit(this.searchForm.value);
        this.searchForm.valueChanges
            .pipe(
                filter(() => this.searchForm.status === 'VALID'),
                debounceTime(300)
            )
            .subscribe(value => this.search.emit(value));
    }

    reset() {
        this.search.emit(this.searchFormService.reset());
    }

    filterByDateRange(value: 'today' | 'week' | 'month' | 'more') {
        switch (value) {
            case 'more':
                this.expanded = true;
                break;
            case 'today':
                this.searchForm.patchValue({
                    fromTime: moment().startOf('day').toDate(),
                    toTime: moment().endOf('day').toDate()
                });
                break;
            default:
                this.searchForm.patchValue({
                    fromTime: moment().startOf('day').subtract(1, value).toDate(),
                    toTime: moment().endOf('day').toDate()
                });
        }
    }
}
