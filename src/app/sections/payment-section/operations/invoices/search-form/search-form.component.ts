import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SearchFormService } from './search-form.service';
import { InvoiceSearchFormValue } from './invoice-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import { Invoice } from '../../../../../api-codegen/anapi/swagger-codegen';

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

    reset() {
        this.searchFormService.reset();
    }
}
