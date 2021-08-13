import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Shop } from '@dsh/api-codegen/capi';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';

import { ShopType } from './types/shop-type';

export interface CreateShopDialogData {
    shops$?: Observable<Shop[]>;
}

@Component({
    selector: 'dsh-create-shop-dialog',
    templateUrl: 'create-shop-dialog.component.html',
    styleUrls: ['create-shop-dialog.component.scss'],
    providers: [
        {
            provide: SHOPS,
            deps: [MAT_DIALOG_DATA],
            useFactory: ({ shops$ }: CreateShopDialogData = {}) => shops$,
        },
    ],
})
export class CreateShopDialogComponent {
    selectedShopType: ShopType;
    selectionConfirmed = false;
    shopType = ShopType;

    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, BaseDialogResponseStatus>,
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
        this.dialogRef.close(BaseDialogResponseStatus.Success);
    }

    cancelClaim(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}
