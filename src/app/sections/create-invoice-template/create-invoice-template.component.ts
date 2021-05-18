import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

import { InvoiceLineTaxVAT, InvoiceTemplateAndToken, Shop } from '@dsh/api-codegen/capi';
import { InvoiceTemplateType, InvoiceTemplateLineCostType } from '@dsh/api/capi';

import { CreateInvoiceTemplateService, WITHOUT_VAT } from './create-invoice-template.service';

@Component({
    selector: 'dsh-create-invoice-template',
    templateUrl: 'create-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceTemplateComponent implements OnInit {
    @Output()
    next = new EventEmitter<InvoiceTemplateAndToken>();

    @Input()
    shops: Shop[];

    minDate = moment().add('2', 'day').startOf('day').toDate();

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    templateType = InvoiceTemplateType;
    costType = InvoiceTemplateLineCostType;

    invoiceTemplateTypes: InvoiceTemplateType[] = [
        InvoiceTemplateType.InvoiceTemplateSingleLine,
        InvoiceTemplateType.InvoiceTemplateMultiLine,
    ];

    invoiceTemplateCostTypes: InvoiceTemplateLineCostType[] = [
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed,
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange,
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim,
    ];

    form = this.invoiceTemplateFormService.form;
    summary$ = this.invoiceTemplateFormService.summary$;
    isLoading$ = this.invoiceTemplateFormService.isLoading$;

    get cartForm(): FormArray {
        return this.invoiceTemplateFormService.cartForm;
    }

    constructor(
        private invoiceTemplateFormService: CreateInvoiceTemplateService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {
        this.invoiceTemplateFormService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
        this.invoiceTemplateFormService.nextInvoiceTemplateAndToken$.subscribe((template) => this.next.emit(template));
    }

    nextStep(): void {
        this.invoiceTemplateFormService.create(this.shops);
    }

    clear(): void {
        this.invoiceTemplateFormService.clear();
    }

    addProduct(): void {
        this.invoiceTemplateFormService.addProduct();
    }

    removeProduct(idx: number): void {
        this.invoiceTemplateFormService.removeProduct(idx);
    }
}
