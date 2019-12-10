import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormValue } from '../../payment-section/operations/search-form-value';
import { ClaimSearchFormValue } from './claim-search-form-value';

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
    statuses: string[] = ['pending', 'review', 'pendingAcceptance', 'accepted', 'denied', 'revoked'];

    constructor(private searchFormService: SearchFormService) {
    }

    ngOnInit() {
        this.searchForm = this.searchFormService.searchForm;
        this.searchFormService.formValueChanges(this.valueDebounceTime).subscribe(v => this.formValueChanges.emit(v));
    }

    reset() {
        this.searchFormService.reset();
    }
}
