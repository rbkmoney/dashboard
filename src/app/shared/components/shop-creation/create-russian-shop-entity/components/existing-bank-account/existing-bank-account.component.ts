import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PayoutTool } from '@dsh/api-codegen/capi';

import { RussianShopEntity } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-existing-bank-account',
    templateUrl: 'existing-bank-account.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingBankAccountComponent {
    @Input() form: FormGroup<RussianShopEntity>;
    @Input() payoutTool: PayoutTool;
    @Input() isLoading: boolean;
    @Input() hasError: boolean;
}
