import { Component, EventEmitter, Output } from '@angular/core';

import { SearchFormService } from './search-form.service';
import { SearchParams } from '../search-params';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent {
    @Output() formValueChanges = new EventEmitter<SearchParams>();

    shops$ = this.searchFormService.shops$;

    form = this.searchFormService.form;

    constructor(private searchFormService: SearchFormService) {}

}
