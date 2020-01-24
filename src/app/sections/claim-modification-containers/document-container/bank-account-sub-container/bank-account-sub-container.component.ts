import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianBankAccount } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-bank-account-sub-container',
    templateUrl: 'bank-account-sub-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankAccountSubContainerComponent {
    @Input() bankAccount: RussianBankAccount;
}
