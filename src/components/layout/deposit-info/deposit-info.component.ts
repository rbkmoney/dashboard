import { Component, Input } from '@angular/core';

import { Deposit } from '../../../app/api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-deposit-info',
    templateUrl: 'deposit-info.component.html',
})
export class DepositInfoComponent {
    @Input() deposit: Deposit;
}
