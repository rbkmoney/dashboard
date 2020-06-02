import { Component } from '@angular/core';

import { WithdrawalStatus } from '../../../../api-codegen/wallet-api/swagger-codegen';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService],
})
export class SearchFormComponent {
    form = this.searchFormService.form;
    reset = this.searchFormService.reset;

    withdrawalStatuses: WithdrawalStatus.StatusEnum[] = ['Pending', 'Succeeded', 'Failed'];

    expanded = false;

    constructor(private searchFormService: SearchFormService) {}
}
