import { Component } from '@angular/core';

import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent {}
