import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianBankAccount } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-bank-account-panel',
    templateUrl: 'bank-account-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountPanelComponent {
    @Input() bankAccount: RussianBankAccount;
}
