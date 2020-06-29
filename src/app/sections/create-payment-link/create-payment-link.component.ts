import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { coerceBoolean } from '../../../utils';
import { Invoice, InvoiceTemplateAndToken } from '../../api-codegen/capi';
import { CreatePaymentLinkService, HoldExpiration } from './create-payment-link.service';

const OrderedPaymentMethodsNames = ['bankCard', 'wallets', 'terminals', 'applePay', 'googlePay', 'samsungPay'] as const;

@Component({
    selector: 'dsh-create-payment-link',
    templateUrl: 'create-payment-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentLinkComponent implements OnInit {
    @Input()
    @coerceBoolean
    backButton = false;

    @Input()
    @coerceBoolean
    cancelButton = false;

    @Input()
    set template(template: InvoiceTemplateAndToken) {
        if (template) {
            this.createPaymentLinkService.changeInvoiceTemplate(template);
            this.type = 'template';
        }
    }

    @Input()
    set invoice(invoice: Invoice) {
        if (invoice) {
            this.createPaymentLinkService.changeInvoice(invoice);
            this.type = 'invoice';
        }
    }

    @Output() back = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    type: 'invoice' | 'template' = null;

    holdExpirations = Object.entries(HoldExpiration);

    form = this.createPaymentLinkService.form;
    link$ = this.createPaymentLinkService.paymentLink$;
    isLoading$ = this.createPaymentLinkService.isLoading$;

    orderedPaymentMethodsNames = OrderedPaymentMethodsNames;

    paymentMethodsEnabled = Object.fromEntries(
        Object.entries(this.createPaymentLinkService.paymentMethodsFormGroup.controls).map(([k, v]) => [
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

    ngOnInit() {
        this.createPaymentLinkService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }

    create() {
        switch (this.type) {
            case 'invoice':
                this.createPaymentLinkService.createByInvoice();
                break;
            case 'template':
                this.createPaymentLinkService.createByTemplate();
                break;
        }
    }

    clear() {
        this.createPaymentLinkService.clear();
    }

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
