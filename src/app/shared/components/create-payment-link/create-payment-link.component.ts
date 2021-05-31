import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { Invoice, InvoiceTemplateAndToken } from '@dsh/api-codegen/capi';
import { coerceBoolean } from '@dsh/utils';

import { CreatePaymentLinkService } from './services/create-payment-link.service';
import { HoldExpiration } from './types/hold-expiration';
import { InvoiceType } from './types/invoice-type';
import { ORDERED_PAYMENT_METHODS_NAMES } from './types/ordered-payment-methods-names';

@Component({
    selector: 'dsh-create-payment-link',
    templateUrl: 'create-payment-link.component.html',
    styleUrls: ['create-payment-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkComponent implements OnInit {
    @Input()
    @coerceBoolean
    backButton = false;

    @Input()
    @coerceBoolean
    embed = false;

    @Input()
    set template(template: InvoiceTemplateAndToken) {
        if (template) {
            this.createPaymentLinkService.changeInvoiceTemplate(template);
            this.type = InvoiceType.Template;
        }
    }

    @Input()
    set invoice(invoice: Invoice) {
        if (invoice) {
            this.createPaymentLinkService.changeInvoice(invoice);
            this.type = InvoiceType.Invoice;
        }
    }

    @Output() back = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    type: InvoiceType = null;

    holdExpirations = Object.entries(HoldExpiration);

    form = this.createPaymentLinkService.form;
    link$ = this.createPaymentLinkService.paymentLink$;
    isLoading$ = this.createPaymentLinkService.isLoading$;

    orderedPaymentMethodsNames = ORDERED_PAYMENT_METHODS_NAMES;

    paymentMethodsEnabled = Object.fromEntries(
        Object.entries(this.createPaymentLinkService.form.controls.paymentMethods.controls).map(([k, v]) => [
            k,
            v.statusChanges.pipe(
                startWith(v.enabled),
                map(() => v.enabled),
                shareReplay(1)
            ),
        ])
    );

    constructor(
        private createPaymentLinkService: CreatePaymentLinkService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {
        this.createPaymentLinkService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }

    create(): void {
        switch (this.type) {
            case InvoiceType.Invoice:
                this.createPaymentLinkService.createByInvoice();
                break;
            case InvoiceType.Template:
                this.createPaymentLinkService.createByTemplate();
                break;
        }
    }

    clear(): void {
        this.createPaymentLinkService.clear();
    }

    copied(isCopied: boolean): void {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
