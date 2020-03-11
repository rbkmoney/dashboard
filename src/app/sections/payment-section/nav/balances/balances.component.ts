import { Component } from '@angular/core';

import { BalancesService } from './balances.service';

@Component({
    selector: 'dsh-balances',
    templateUrl: './balances.component.html',
    providers: [BalancesService]
})
export class BalancesComponent {
    balances: { amount: number; currency: string }[] = [
        { amount: 234237462, currency: 'RUB' },
        { amount: 1234863, currency: 'USD' },
        { amount: 236544, currency: 'EUR' }
    ];
}
