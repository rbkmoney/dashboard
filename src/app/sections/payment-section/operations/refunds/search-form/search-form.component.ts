import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { RefundStatus } from '../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';
import { SearchFormValue } from '../../search-form-value';
import { RefundsSearchFormValue } from './refunds-search-form-value';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;

    @Output() formValueChanges: EventEmitter<RefundsSearchFormValue> = new EventEmitter<RefundsSearchFormValue>();

    searchForm: FormGroup = this.searchFormService.searchForm;
    expanded = false;
    statuses: RefundStatus.StatusEnum[] = Object.values(RefundStatus.StatusEnum);
    shopsInfo$ = this.searchFormService.shopsInfo$;

    constructor(private searchFormService: SearchFormService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

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
