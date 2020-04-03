import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { CustomersTopic, InvoicesTopic, Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../api/webhooks';
import { booleanDelay, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';

type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Injectable()
export class CreateWebhookService {
    form = this.initForm();

    private webhookState$ = new BehaviorSubject(null);
    private webhookError$ = new BehaviorSubject(false);
    private saveWebhook$: Subject<FormParams> = new Subject();

    webhook$: Observable<Webhook[]> = this.webhookState$.pipe(
        filter(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhookSaved$ = this.webhook$.pipe(
        booleanDelay(),
        map(r => !r)
    );

    error$: Observable<any> = this.webhookError$.asObservable();

    constructor(
        private fb: FormBuilder,
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.saveWebhook$
            .pipe(
                map(formValuesToWebhook),
                switchMap(v =>
                    this.webhooksService.createWebhook(v).pipe(
                        catchError(err => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhookError$.next(true);
                            return [];
                        })
                    )
                )
            )
            .subscribe(webhook => this.webhookState$.next(webhook));
    }

    typesChanged(checked: boolean, type: InvoicesEventTypesEnum | CustomersEventTypesEnum) {
        if (checked) {
            this.form.patchValue({ types: [...this.form.value.types, type] });
        } else {
            this.form.patchValue({ types: this.form.value.types.filter(t => t !== type) });
        }
    }

    save() {
        this.saveWebhook$.next(this.form.value);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            shop: ['', Validators.required],
            url: ['', Validators.required],
            types: [[], Validators.required]
        });
    }
}
