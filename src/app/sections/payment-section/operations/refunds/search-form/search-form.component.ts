import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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

    reset() {
        this.searchFormService.reset();
    }
}
