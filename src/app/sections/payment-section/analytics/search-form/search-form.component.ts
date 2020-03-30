import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { SearchParams } from '../search-params';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Input() valueDebounceTime = 300;

    @Input()
    formValue: SearchParams;

    @Output()
    formValueChanges = new EventEmitter<SearchParams>();

    shops$ = this.searchFormService.shops$;

    form = this.searchFormService.form;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$
            .pipe(debounceTime(this.valueDebounceTime))
            .subscribe(v => this.formValueChanges.emit(v));
    }
}
