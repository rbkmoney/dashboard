import { Component, Input } from '@angular/core';

import { Withdrawal } from '../../../app/api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-withdrawal-info',
    templateUrl: 'withdrawal-info.component.html',
})
export class WithdrawalInfoComponent {
    @Input() withdrawal: Withdrawal;
}
