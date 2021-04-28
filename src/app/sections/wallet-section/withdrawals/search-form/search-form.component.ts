import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { SearchFormService } from './search-form.service';

@UntilDestroy()
@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService],
})
export class SearchFormComponent {
    form = this.searchFormService.form;

    withdrawalStatuses: WithdrawalStatus.StatusEnum[] = ['Pending', 'Succeeded', 'Failed'];

    expanded = false;

    constructor(private searchFormService: SearchFormService) {}

    reset(): void {
        this.searchFormService.reset();
    }
}
