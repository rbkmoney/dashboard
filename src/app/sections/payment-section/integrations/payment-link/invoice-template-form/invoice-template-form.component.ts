import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { merge } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { InvoiceLineTaxVAT } from '../../../../../api-codegen/capi';
import { CostType, InvoiceTemplateFormService, TemplateType, withoutVAT } from './invoice-template-form.service';

@Component({
    selector: 'dsh-invoice-template-form',
    templateUrl: 'invoice-template-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTemplateFormComponent implements OnInit {
    @Output()
    next = new EventEmitter<void>();

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = withoutVAT;

    templateType = TemplateType;
    costType = CostType;

    templateTypes = Object.entries(TemplateType);
    costTypes = Object.entries(CostType);

    form = this.invoiceTemplateFormService.form;
    shops$ = this.invoiceTemplateFormService.shops$;
    summary$ = this.invoiceTemplateFormService.summary$;
    isLoading$ = this.invoiceTemplateFormService.isLoading$;

    get cartForm() {
        return this.invoiceTemplateFormService.cartForm;
    }

    constructor(
        private invoiceTemplateFormService: InvoiceTemplateFormService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.invoiceTemplateFormService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }

    nextStep() {
        merge(
            this.invoiceTemplateFormService.invoiceTemplateAndToken$.pipe(tap(() => this.next.emit())),
            this.invoiceTemplateFormService.errors$
        )
            .pipe(take(1))
            .subscribe();
        this.invoiceTemplateFormService.create();
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
