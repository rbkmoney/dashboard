import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';

import { InvoiceLineTaxVAT } from '@dsh/api-codegen/anapi';
import { Invoice, Shop } from '@dsh/api-codegen/capi';

import { CreateInvoiceService, WITHOUT_VAT } from './create-invoice.service';

@Component({
    selector: 'dsh-create-invoice',
    templateUrl: 'create-invoice.component.html',
    styleUrls: ['create-invoice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceComponent {
    @Output()
    next = new EventEmitter<Invoice>();

    @Output()
    back = new EventEmitter<void>();

    @Input()
    shops: Shop[];

    @Input()
    buttonType: 'create' | 'next' = 'create';

    form = this.createInvoiceService.form;
    totalAmount$ = this.createInvoiceService.totalAmount$;
    taxVatRates = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    minDate = moment().add('2', 'day').startOf('day').toDate();

    get cart(): FormArray {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private createInvoiceService: CreateInvoiceService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    create(): void {
        this.createInvoiceService.createInvoice(this.shops).subscribe(
            ({ invoice }) => {
                this.next.emit(invoice);
            },
            () => {
                this.snackBar.open(this.transloco.translate('commonError'), this.transloco.translate('ok'));
            }
        );
    }

    add(): void {
        this.createInvoiceService.addCartItem();
    }

    remove(idx: number): void {
        this.createInvoiceService.removeCartItem(idx);
    }

    clear(): void {
        this.createInvoiceService.clear();
    }
}
