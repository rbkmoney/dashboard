import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

import { amountValidator } from '@dsh/components/form-controls';

import { toMinor } from '../../../../../utils';
import { ShopInfo } from '../../operations/operators';
import { CreatePayoutDialogService } from './create-payout-dialog.service';

@Component({
    selector: 'dsh-create-payout-dialog',
    templateUrl: 'create-payout-dialog.component.html',
    providers: [CreatePayoutDialogService],
})
export class CreatePayoutDialogComponent {
    form = this.fb.group({
        shopID: null,
    });

    hasSelectedShop = false;

    currentPayoutToolCurrency: string;

    shopsInfo$ = this.data.shopsInfo$;

    isPayoutToolsLoading$ = this.createPayoutDialogService.isLoading$;
    payoutTools$ = this.createPayoutDialogService.payoutTools$;
    hasPayoutTools$ = this.createPayoutDialogService.hasPayoutTools$;

    constructor(
        private dialogRef: MatDialogRef<CreatePayoutDialogComponent>,
        private fb: FormBuilder,
        private createPayoutDialogService: CreatePayoutDialogService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(MAT_DIALOG_DATA) private data: { shopsInfo$: Observable<ShopInfo[]> }
    ) {
        this.hasPayoutTools$.subscribe((hasPayoutTools) => {
            if (hasPayoutTools) {
                this.form.addControl('payoutToolID', this.fb.control('', [Validators.required]));
                this.form.addControl(
                    'amount',
                    this.fb.control('', [Validators.required, amountValidator, Validators.min(1)])
                );
            } else {
                this.form.removeControl('payoutToolID');
                this.form.removeControl('ammount');
            }
        });
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        const { shopID, payoutToolID, amount } = this.form.value;
        this.createPayoutDialogService
            .createPayout(shopID, payoutToolID, toMinor(amount), this.currentPayoutToolCurrency)
            .subscribe(
                () => {
                    this.dialogRef.close('create');
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), this.transloco.translate('ok'));
                }
            );
    }

    onShopSelectionChange(shopID: string) {
        this.hasSelectedShop = !!shopID;
        this.createPayoutDialogService.updateWalletID(shopID);
    }

    onPayoutToolSelectionChange(payoutToolCurrency: string) {
        this.currentPayoutToolCurrency = payoutToolCurrency;
    }
}
