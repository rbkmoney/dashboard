import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SearchFormValue } from '../../search-form-value';
import { PayoutsService } from '../payouts.service';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-payouts-search-form',
    templateUrl: 'search-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SearchFormService]
})
export class SearchFormComponent {
    form = this.searchFormService.form;
    reset = this.searchFormService.reset;

    shopsInfo$ = this.reportsService.shopsInfo$;

    expanded = false;

    constructor(private searchFormService: SearchFormService, private reportsService: PayoutsService) {}

    selectDaterange(v: SearchFormValue) {
        this.form.patchValue(v);
    }
}
