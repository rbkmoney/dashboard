import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SearchFormService } from './search-form.service';
import { ClaimSearchFormValue } from './claim-search-form-value';
import { StatusModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;
    @Input() layoutGap = '20px';

    @Output() formValueChanges: EventEmitter<ClaimSearchFormValue> = new EventEmitter<ClaimSearchFormValue>();

    searchForm: FormGroup;

    statuses = Object.values(StatusModificationUnit.StatusEnum).filter(i => i !== 'pendingAcceptance');

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe(v => this.formValueChanges.emit(v));
    }
}
