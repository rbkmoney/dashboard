import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { ShopItem } from '../interfaces';

@Component({
    selector: 'dsh-shop-details',
    templateUrl: './shop-details.component.html',
    styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent {
    @Input() shop: ShopItem;

    @Output() activateShop = new EventEmitter<string>();
    @Output() suspendShop = new EventEmitter<string>();

    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }

    activate(id: string) {
        this.activateShop.emit(id);
    }

    suspend(id: string) {
        this.suspendShop.emit(id);
    }
}
