import { Component } from '@angular/core';

import { WithdrawalsService } from './withdrawals.service';

@Component({
    selector: 'dsh-withdrawals',
    templateUrl: './withdrawals.component.html',
    styleUrls: ['./withdrawals.component.scss'],
    providers: [WithdrawalsService],
})
export class WithdrawalsComponent {
    constructor() {}
}
