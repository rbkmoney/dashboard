import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { BehaviorSubject, defer, merge, Subject } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { InvoiceService } from '@dsh/api';
import { Controls } from '@dsh/app/shared/components/create-payment-link-form';
import { CreatePaymentLinkService } from '@dsh/app/shared/services/create-payment-link/create-payment-link.service';
import { shareReplayRefCount } from '@dsh/operators';

import { CreatePaymentLinkDialogData } from './types/create-payment-link-dialog-data';

@Component({
    selector: 'dsh-create-payment-link-dialog',
    templateUrl: 'create-payment-link-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentLinkDialogComponent {
    paymentMethods$ = this.invoiceService.getInvoicePaymentMethods(this.data.invoice.id).pipe(shareReplayRefCount());

    formControl = new FormControl<Controls>();
    paymentLink$ = merge(
        defer(() => this.create$).pipe(
            switchMap(() =>
                this.createPaymentLinkService.createPaymentLinkByInvoice(this.data.invoice, this.formControl.value)
            )
        ),
        this.formControl.valueChanges.pipe(mapTo(''))
    );
    inProgress$ = new BehaviorSubject(false);

    private create$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CreatePaymentLinkDialogComponent, 'cancel'>,
        @Inject(MAT_DIALOG_DATA) public data: CreatePaymentLinkDialogData,
        private createPaymentLinkService: CreatePaymentLinkService,
        private invoiceService: InvoiceService
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }

    create(): void {
        this.create$.next();
    }
}
