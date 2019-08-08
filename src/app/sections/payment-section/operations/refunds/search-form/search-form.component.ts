import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { RefundSearchFormValue } from './refund-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import {
    RefundStatus
} from '../../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<RefundSearchFormValue> = new EventEmitter<RefundSearchFormValue>();

    localeBaseDir = 'sections.operations.refunds.filter';
    searchForm: FormGroup;
    expanded = false;
    statuses: RefundStatus.StatusEnum[] = ['pending', 'succeeded', 'failed'];

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
