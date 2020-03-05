import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-balance-item',
    templateUrl: './balance-item.component.html'
})
export class BalanceItemComponent {
    @Input() balance: { amount: number; currency: string };
}
