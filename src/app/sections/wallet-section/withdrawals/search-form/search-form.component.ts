import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { WithdrawalStatus } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { walletsToOptions } from '@dsh/app/shared/utils/wallets-to-options';

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

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions), shareReplay(1));

    get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('walletID') as FormControl;
    }

    constructor(private searchFormService: SearchFormService, private walletService: WalletService) {}

    reset(): void {
        this.searchFormService.reset();
    }
}
