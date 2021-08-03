import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ShopType } from '../../../types/shop-type';
import { CreateShopDialogResponse } from '../../create-russian-shop-entity/types/create-shop-dialog-response';
import { CreateShopDialogConfig } from '../../types/create-shop-dialog-config';

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
        @Inject(MAT_DIALOG_DATA) public data: CreateShopDialogConfig,
        private router: Router
    ) {}

    onTypeChange(type: ShopType): void {
        this.selectedShopType = type;
    }

    next(): void {
        if (this.selectedShopType === ShopType.New) {
            this.dialogRef.close();
            this.router.navigate(['claim-section', 'onboarding']);
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
