import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { oneMustBeSelected } from '@dsh/components/form-controls';

import { IdentityService } from '../../../../../api/identity';
import { WalletService } from '../../../../../api/wallet';
import { WalletWebhooksService } from '../../../../../api/wallet-webhooks';
import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';
import { getEventsByTopic } from './get-events-by-topic';

@Injectable()
export class CreateWebhookDialogService {
    private create$: Subject<FormParams> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private created$ = new Subject();

    wallets$ = this.walletService.wallets$.pipe(shareReplay(1));

    identities$ = this.identityService.identities$.pipe(shareReplay(1));

    form = this.initForm();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    webhookCreated$ = this.created$.asObservable();

    constructor(
        private fb: FormBuilder,
        private walletService: WalletService,
        private identityService: IdentityService,
        private walletWebhooksService: WalletWebhooksService
    ) {
        this.create$
            .pipe(
                map(formValuesToWebhook),
                switchMap((v) =>
                    this.walletWebhooksService.createWebhook(v).pipe(
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
            identityID: ['', Validators.required],
            url: ['', Validators.required],
            eventType: ['WithdrawalsTopic', Validators.required],
            walletID: '',
            eventTypes: this.fb.array(
                getEventsByTopic('WithdrawalsTopic').map((eventName) =>
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
