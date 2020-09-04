import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { BalancesService } from './balances.service';

@Component({
    selector: 'dsh-balances',
    templateUrl: 'balances.component.html',
    providers: [BalancesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalancesComponent implements OnInit, OnDestroy {
    balances$ = this.balancesService.balances$;
    balancesCount$ = this.balancesService.balancesCount$;

    constructor(private balancesService: BalancesService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.pipe(pluck('envID')).subscribe((envID) => this.balancesService.init(envID));
    }

    ngOnDestroy() {
        this.balancesService.destroy();
    }
}
