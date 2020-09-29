import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { oneMustBeSelected } from '@dsh/components/form-controls';

import TopicEnum = WebhookScope.TopicEnum;

import {
    DestinationsTopic,
    WebhookScope,
    WithdrawalsTopic,
} from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { IdentityService } from '../../../../../api/identity';
import { WalletService } from '../../../../../api/wallet';
import { WalletWebhooksService } from '../../../../../api/wallet-webhooks';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';

@Injectable()
export class CreateWebhookDialogService {
    withdrawalTypes = Object.values(WithdrawalsTopic.EventTypesEnum);
    destinationTypes = Object.values(DestinationsTopic.EventTypesEnum);

    activeTopic$ = new BehaviorSubject<TopicEnum>('WithdrawalsTopic');

    wallets$ = this.walletService.wallets$.pipe(shareReplay(1));

    identities$ = this.identityService.identities$.pipe(shareReplay(1));

    form = this.initForm();

    private createWebhook$: Subject<FormParams> = new Subject();

    webhookCreated$: Subject<'created' | null> = new Subject();
    isLoading$ = progress(this.createWebhook$, this.webhookCreated$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private fb: FormBuilder,
        private walletService: WalletService,
        private identityService: IdentityService,
        private walletWebhooksService: WalletWebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.createWebhook$
            .pipe(
                map(formValuesToWebhook),
                switchMap((v) =>
                    this.walletWebhooksService.createWebhook(v).pipe(
                        catchError((err) => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            this.webhookCreated$.next(null);
                            return [];
                        })
                    )
                )
            )
            .subscribe(() => this.webhookCreated$.next('created'));
        this.activeTopic$.subscribe((activeTopic) => {
            if (activeTopic === 'WithdrawalsTopic') {
                this.form.addControl('walletID', this.fb.control(''));
            } else {
                this.form.removeControl('walletID');
            }
            this.form.removeControl('eventTypes');
            this.form.addControl('eventTypes', this.initEventTypesForm());
        });
    }

    save() {
        this.createWebhook$.next(this.form.value);
    }

    changeActiveTopic(type: TopicEnum) {
        this.activeTopic$.next(type);
    }

    private initForm(): FormGroup {
        const form = this.fb.group({
            identityID: ['', Validators.required],
            url: ['', Validators.required],
            eventType: [this.activeTopic$.value, Validators.required],
            eventTypes: this.initEventTypesForm(),
        });
        if (this.activeTopic$.value === 'WithdrawalsTopic') {
            form.addControl('walletID', this.fb.control(''));
        }
        return form;
    }

    private initEventTypesForm() {
        return this.fb.array(
            this.getAvailableEvents().map((eventName) =>
                this.fb.group({
                    eventName,
                    selected: false,
                })
            ),
            [oneMustBeSelected]
        );
    }

    private getAvailableEvents(): string[] {
        switch (this.activeTopic$.value) {
            case 'WithdrawalsTopic':
                return this.withdrawalTypes;
            case 'DestinationsTopic':
                return this.destinationTypes;
            default:
                return [];
        }
    }
}
