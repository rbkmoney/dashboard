import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { HoldExpiration, PaymentLinkFormService } from './payment-link-form.service';

@Component({
    selector: 'dsh-payment-link-form',
    templateUrl: 'payment-link-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentLinkFormComponent implements OnInit {
    @Output()
    back = new EventEmitter<void>();

    holdExpirations = Object.entries(HoldExpiration);

    form = this.paymentLinkFormService.form;
    link$ = this.paymentLinkFormService.invoiceTemplatePaymentLink$;
    isLoading$ = this.paymentLinkFormService.isLoading$;

    orderedPaymentMethodsNames = ['bankCard', 'wallets', 'terminals', 'applePay', 'googlePay', 'samsungPay'];

    paymentMethodsEnabled = Object.fromEntries(
        Object.entries(this.paymentLinkFormService.paymentMethodsFormGroup.controls).map(([k, v]) => [
            k,
            v.statusChanges.pipe(
                startWith(),
                map(() => v.enabled),
                shareReplay(1)
            ),
        ])
    );

    constructor(
        private paymentLinkFormService: PaymentLinkFormService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.paymentLinkFormService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }

    create() {
        this.paymentLinkFormService.create();
    }

    clear() {
        this.paymentLinkFormService.clear();
    }

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
