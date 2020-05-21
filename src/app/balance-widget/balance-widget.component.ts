import { Component } from '@angular/core';

import { BalanceWidgetService } from './balance-widget.service';

@Component({
    selector: 'dsh-balance-widget',
    templateUrl: './balance-widget.component.html',
    providers: [BalanceWidgetService],
})
export class BalanceWidgetComponent {
    balances: { amount: number; currency: string }[];
}
