import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

import { InvoiceLineTaxVAT } from '../../../../../api-codegen/anapi';
import { ShopInfo } from '../../operators';
import { CreateInvoiceDialogService, WITHOUT_VAT } from './create-invoice-dialog.service';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    styleUrls: ['create-invoice-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateInvoiceDialogService]
})
export class CreateInvoiceDialogComponent {
    form = this.createInvoiceDialogService.form;
    shopsInfo$: Observable<ShopInfo[]>;
    totalAmount$ = this.createInvoiceDialogService.totalAmount$;
    taxVatRates = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    get cart() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, 'cancel' | 'create'>,
        private createInvoiceDialogService: CreateInvoiceDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: { shopsInfo$: Observable<ShopInfo[]> },
        private router: Router
    ) {
        this.shopsInfo$ = data.shopsInfo$;
    }

    cancel() {
        this.dialogRef.close('cancel');
    }

    create() {
        this.createInvoiceDialogService.createInvoice().subscribe(
            ({ invoice }) => {
                this.dialogRef.close('create');
                this.router.navigate(['invoice', invoice.id]);
            },
            () => {
                this.snackBar.open(this.transloco.translate('commonError'), this.transloco.translate('ok'));
            }
        );
    }

    add() {
        this.createInvoiceDialogService.addCartItem();
    }

    remove(idx: number) {
        this.createInvoiceDialogService.removeCartItem(idx);
    }
}
