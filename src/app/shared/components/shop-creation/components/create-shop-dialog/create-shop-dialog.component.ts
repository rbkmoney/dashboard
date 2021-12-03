import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Shop } from '@dsh/api-codegen/capi';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';

import { IntegrationService, IntegrationsEnum } from '../../../../../integration';
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

    integrationsEnum = IntegrationsEnum;

    get integration(): IntegrationsEnum {
        return this.integrationService.integration;
    }

    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, BaseDialogResponseStatus>,
        private integrationService: IntegrationService
    ) {}

    onTypeChange(type: ShopType): void {
        this.selectedShopType = type;
    }

    next(): void {
        this.selectionConfirmed = true;
    }

    sendClaim(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Success);
    }

    cancelClaim(): void {
        this.dialogRef.close(BaseDialogResponseStatus.Cancelled);
    }
}
