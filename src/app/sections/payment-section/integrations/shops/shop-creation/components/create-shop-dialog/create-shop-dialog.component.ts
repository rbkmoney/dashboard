import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ShopType } from '../../../types/shop-type';
import { CreateShopDialogResponse } from '../../create-russian-shop-entity/types/create-shop-dialog-response';

@Component({
    selector: 'dsh-create-shop-dialog',
    templateUrl: 'create-shop-dialog.component.html',
    styleUrls: ['create-shop-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateShopDialogComponent {
    selectedShopType: ShopType;

    selectionConfirmed = false;

    shopType = ShopType;

    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, CreateShopDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public data: { realm: string },
        private router: Router
    ) {}

    onTypeChange(type: ShopType) {
        this.selectedShopType = type;
    }

    next() {
        if (this.selectedShopType === ShopType.new) {
            this.dialogRef.close();
            this.router.navigate(['onboarding']);
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
