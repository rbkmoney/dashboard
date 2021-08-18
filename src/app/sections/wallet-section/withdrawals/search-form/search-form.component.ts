import { Component } from '@angular/core';

import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { SearchFormService } from './search-form.service';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService],
})
export class SearchFormComponent {
    form = this.searchFormService.form;

    withdrawalStatuses = Object.keys(WithdrawalStatus.StatusEnum);

    expanded = false;

    constructor(private searchFormService: SearchFormService) {}

    reset(): void {
        this.searchFormService.reset();
    }
}
