import { Component, Input } from '@angular/core';

import { BankAccount } from '../../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-bank-account-info',
    templateUrl: 'bank-account-info.component.html'
})
export class BankAccountInfoComponent {
    @Input() bankAccount: BankAccount;
}
