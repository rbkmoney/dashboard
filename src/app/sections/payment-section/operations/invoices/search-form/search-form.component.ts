import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, pluck, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    statuses: Invoice.StatusEnum[] = Object.values(Invoice.StatusEnum);
    shopsInfo$ = this.searchFormService.shopsInfo$;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
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
