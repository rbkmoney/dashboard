import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { booleanDebounceTime } from '../../../../custom-operators';
import { LAYOUT_GAP } from '../../../constants';
import { CreateShopDialogComponent } from './create-shop-dialog';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsService } from './shops.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopsService, ShopsBalanceService],
})
export class ShopsComponent {
    shops$ = this.shopsService.shops$;
    isLoading$ = this.shopsService.isLoading$.pipe(booleanDebounceTime());
    lastUpdated$ = this.shopsService.lastUpdated$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private shopsService: ShopsService,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    activate(id: string): void {
        this.shopsService.activate(id);
    }

    suspend(id: string): void {
        this.shopsService.suspend(id);
    }

    refreshData(): void {
        this.shopsService.refreshData();
    }

    createShop(): void {
        this.dialog
            .open(CreateShopDialogComponent, {
                width: '552px',
                maxHeight: '90vh',
                disableClose: true,
                data: {
                    realm: this.route.snapshot.params.realm,
                },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe();
    }
}
