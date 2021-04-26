import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { walletsToOptions } from '@dsh/app/shared/utils/wallets-to-options';

import { MainFilters } from './types/main-filters';

@UntilDestroy()
@Component({
    selector: 'dsh-main-filters',
    templateUrl: './main-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFiltersComponent {
    @Input() form: FormGroup<MainFilters>;

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions), shareReplay(1));

    get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return (this.form.get('walletID') as AbstractControl) as FormControl;
    }

    constructor(private walletService: WalletService) {}
}
