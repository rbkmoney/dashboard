import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { WebhooksService } from '../../../../../api/webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { TYPES } from './event-types';
import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';

const oneMustBeSelected: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
    control.value.map(c => c.selected).includes(true) ? null : { Error: 'At least one of checkboxes select needed' };

@Injectable()
export class CreateWebhookService {
    form = this.initForm();

    private createWebhook$: Subject<FormParams> = new Subject();

    webhookCreated$: Subject<'created' | null> = new Subject();
    isLoading$ = progress(this.createWebhook$, this.webhookCreated$).pipe(
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
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhookCreated$.next(null);
                            return [];
                        })
                    )
                )
            )
            .subscribe(() => this.webhookCreated$.next('created'));
    }

    save() {
        this.createWebhook$.next(this.form.value);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            shop: ['', Validators.required],
            url: ['', Validators.required],
            eventTypes: this.fb.array(
                TYPES.map(t =>
                    this.fb.group({
                        eventName: t,
                        selected: false
                    })
                ),
                [oneMustBeSelected]
            )
        });
    }
}
