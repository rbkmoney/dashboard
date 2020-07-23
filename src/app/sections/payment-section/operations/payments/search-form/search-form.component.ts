import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, shareReplay } from 'rxjs/operators';

import { Shop } from '../../../../../api-codegen/capi';
import {
    bankCardPaymentSystems as bankCardPaymentSystemsConsts,
    paymentFlows as paymentFlowsConsts,
    paymentMethods as paymentMethodsConsts,
    paymentStatuses as paymentStatusesConsts,
    tokenProviders as tokenProvidersConsts,
} from '../../constants';
import { PaymentSearchFormValue } from './payment-search-form-value';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService],
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<PaymentSearchFormValue> = new EventEmitter<PaymentSearchFormValue>();

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    tokenProviders = tokenProvidersConsts;
    paymentMethods = paymentMethodsConsts;
    bankCardPaymentSystems = bankCardPaymentSystemsConsts;
    paymentFlows = paymentFlowsConsts;
    paymentStatuses = paymentStatusesConsts;

    isBankCard$: Observable<boolean> = this.searchFormService.formValueChanges$.pipe(
        pluck('paymentMethod'),
        map((v) => v === paymentMethodsConsts[0]),
        distinctUntilChanged(),
        shareReplay(1)
    );

    shops$ = this.searchFormService.shops$;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe((v) => this.formValueChanges.emit(v));
    }

    reset() {
        this.searchFormService.reset();
    }

    changeShops(_shops: Shop[]) {
        // this.formValueChanges.next({ ...this.formValueChanges.value, shopIDs: shops.map(({ id }) => id) });
    }
}
