import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

import { InvoiceLineTaxVAT, InvoiceTemplateAndToken, Shop } from '@dsh/api-codegen/capi';

import { CostType, CreateInvoiceTemplateService, TemplateType, WITHOUT_VAT } from './create-invoice-template.service';

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

    minDate = moment().add('1', 'day').startOf('day').toDate();

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    templateType = TemplateType;
    costType = CostType;

    templateTypes = Object.entries(TemplateType);
    costTypes = Object.entries(CostType);

    form = this.invoiceTemplateFormService.form;
    summary$ = this.invoiceTemplateFormService.summary$;
    isLoading$ = this.invoiceTemplateFormService.isLoading$;

    get cartForm() {
        return this.invoiceTemplateFormService.cartForm;
    }

    constructor(
        private invoiceTemplateFormService: CreateInvoiceTemplateService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.invoiceTemplateFormService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
        this.invoiceTemplateFormService.nextInvoiceTemplateAndToken$.subscribe((template) => this.next.emit(template));
    }

    nextStep() {
        this.invoiceTemplateFormService.create(this.shops);
    }

    clear() {
        this.invoiceTemplateFormService.clear();
    }

    addProduct() {
        this.invoiceTemplateFormService.addProduct();
    }

    removeProduct(idx: number) {
        this.invoiceTemplateFormService.removeProduct(idx);
    }
}
