import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormValue } from '../../search-form-value';
import { RefundStatus } from '../../../../../api-codegen/capi/swagger-codegen';
import { RefundsSearchFormValue } from './refunds-search-form-value';
import { LAYOUT_GAP } from '../../../../constants';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;

    @Output() formValueChanges: EventEmitter<RefundsSearchFormValue> = new EventEmitter<RefundsSearchFormValue>();

    localeBaseDir = 'sections.operations.refunds.filter';
    searchForm: FormGroup;
    expanded = false;
    statuses: RefundStatus.StatusEnum[] = ['pending', 'succeeded', 'failed'];

    constructor(private searchFormService: SearchFormService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

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
