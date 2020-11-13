import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BalancesService } from './balances.service';

@Component({
    selector: 'dsh-balances',
    templateUrl: 'balances.component.html',
    providers: [BalancesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalancesComponent {
    balances$ = this.balancesService.balances$;
    balancesCount$ = this.balancesService.balancesCount$;

    constructor(private balancesService: BalancesService) {}
}
