import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { booleanDebounceTime } from '../../../../custom-operators';
import { LAYOUT_GAP } from '../../../constants';
import { CreateShopDialogComponent } from './create-shop-dialog';
import { ShopsService } from './shops.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopsService],
})
export class ShopsComponent {
    shops$ = this.shopsService.shops$;
    isLoading$ = this.shopsService.isLoading$.pipe(booleanDebounceTime());

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private shopsService: ShopsService,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    activate(id: string) {
        this.shopsService.activate(id);
    }

    suspend(id: string) {
        this.shopsService.suspend(id);
    }

    createShop() {
        this.dialog
            .open(CreateShopDialogComponent, {
                width: '552px',
                maxHeight: '90vh',
                disableClose: true,
                data: {
                    envID: this.route.snapshot.params.envID,
                },
            })
            .afterClosed()
            .subscribe();
    }
}
