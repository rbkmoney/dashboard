import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ShopType } from '../../../../../sections/payment-section/integrations/shops/types/shop-type';
import { CreateShopDialogResponse } from '../../create-russian-shop-entity/types/create-shop-dialog-response';

@Component({
    selector: 'dsh-create-shop-dialog',
    templateUrl: 'create-shop-dialog.component.html',
    styleUrls: ['create-shop-dialog.component.scss'],
})
export class CreateShopDialogComponent {
    selectedShopType: ShopType;
    selectionConfirmed = false;
    shopType = ShopType;

    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, CreateShopDialogResponse>,
        private router: Router
    ) {}

    onTypeChange(type: ShopType): void {
        this.selectedShopType = type;
    }

    next(): void {
        if (this.selectedShopType === ShopType.New) {
            this.dialogRef.close();
            void this.router.navigate(['claim-section', 'onboarding']);
        }
        this.selectionConfirmed = true;
    }

    sendClaim(): void {
        this.dialogRef.close('send');
    }

    cancelClaim(): void {
        this.dialogRef.close('canceled');
    }
}
