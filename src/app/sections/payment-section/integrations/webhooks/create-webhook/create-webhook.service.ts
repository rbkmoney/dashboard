import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { Webhook } from '../../../../../api-codegen/capi/swagger-codegen';
import { WebhooksService } from '../../../../../api/webhooks';
import { booleanDebounceTime, booleanDelay, progress, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { TYPES } from './event-types';
import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';

@Injectable()
export class CreateWebhookService {
    types = TYPES;
    form = this.initForm();

    private webhookState$ = new BehaviorSubject(null);
    private webhookError$ = new BehaviorSubject(false);
    private createWebhook$: Subject<FormParams> = new Subject();

    webhook$: Observable<Webhook[]> = this.webhookState$.pipe(
        filter(s => !!s),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhookCreated$ = this.webhook$.pipe(
        booleanDelay(),
        map(r => (!r ? 'created' : null))
    );

    isLoading$ = progress(this.createWebhook$, this.webhookState$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private fb: FormBuilder,
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.createWebhook$
            .pipe(
                map(formValuesToWebhook),
                switchMap(v =>
                    this.webhooksService.createWebhook(v).pipe(
                        catchError(err => {
                            console.error(err);
                            this.webhookState$.next(null);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhookError$.next(true);
                            return [];
                        })
                    )
                )
            )
            .subscribe(webhook => this.webhookState$.next(webhook));
    }

    save() {
        this.createWebhook$.next(this.form.value);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            shop: ['', Validators.required],
            url: ['', Validators.required],
            eventTypes: this.fb.array(
                this.types.map(t =>
                    this.fb.group({
                        eventName: t,
                        selected: false
                    })
                )
            )
        });
    }
}
