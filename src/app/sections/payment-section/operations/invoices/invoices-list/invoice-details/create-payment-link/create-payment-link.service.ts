import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreatePaymentLinkDialogComponent } from './components/create-payment-link-dialog/create-payment-link-dialog.component';
import { CreatePaymentLinkDialogConfig } from './types/create-payment-link-dialog-config';

@Injectable()
export class CreatePaymentLinkService {
    constructor(private dialog: MatDialog) {}

    createPaymentLink(config: CreatePaymentLinkDialogConfig): void {
        this.dialog.open<CreatePaymentLinkDialogComponent, CreatePaymentLinkDialogConfig>(
            CreatePaymentLinkDialogComponent,
            {
                width: '720px',
                data: config,
            }
        );
    }
}
