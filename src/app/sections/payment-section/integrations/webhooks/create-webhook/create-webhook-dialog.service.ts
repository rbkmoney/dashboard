import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/api/webhooks';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';
import { getEventsByTopic } from './get-events-by-topic';

@Injectable()
export class CreateWebhookDialogService {
    private create$: Subject<FormParams> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private created$ = new Subject();

    form = this.initForm();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    webhookCreated$ = this.created$.asObservable();

    constructor(private fb: FormBuilder, private webhooksService: WebhooksService) {
        this.create$
            .pipe(
                map(formValuesToWebhook),
                switchMap((v) =>
                    this.webhooksService.createWebhook(v).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => this.created$.next('created'));
    }

    save() {
        this.create$.next(this.form.value);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            shopID: ['', Validators.required],
            url: ['', Validators.required],
            eventType: ['InvoicesTopic', Validators.required],
            eventTypes: this.fb.array(
                getEventsByTopic('InvoicesTopic').map((eventName) =>
                    this.fb.group({
                        eventName,
                        selected: false,
                    })
                ),
                [oneMustBeSelected]
            ),
        });
    }
}
