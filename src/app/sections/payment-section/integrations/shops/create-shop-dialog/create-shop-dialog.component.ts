import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

enum ShopType {
    russian = 'RussianLegalEntity',
    new = 'NewLegalEntity',
    international = 'InternationalLegalEntity',
}

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
        public dialogRef: MatDialogRef<CreateShopDialogComponent, 'cancel' | 'send'>,
        @Inject(MAT_DIALOG_DATA) public data: { envID: string },
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
}
