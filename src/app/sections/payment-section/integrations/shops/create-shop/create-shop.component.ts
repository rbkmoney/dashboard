import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';

@Component({
    selector: 'dsh-create-shop',
    templateUrl: './create-shop.component.html',
})
export class CreateShopComponent {
    constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

    createShop(): void {
        this.dialog
            .open(CreateShopDialogComponent, {
                width: '552px',
                maxHeight: '90vh',
                disableClose: true,
                autoFocus: false,
                data: {
                    realm: this.route.snapshot.params.realm,
                },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe();
    }
}
