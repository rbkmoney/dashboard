import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash.isnil';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { WebhookScope } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { IdentityService } from '@dsh/api/identity';
import { walletsToOptions } from '@dsh/app/shared/utils/wallets-to-options';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { getEventsByTopic } from '../get-events-by-topic';

import TopicEnum = WebhookScope.TopicEnum;


@UntilDestroy()
@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
})
export class CreateWebhookFormComponent implements OnInit {
    @Input() form: FormGroup;

    identities$ = this.identityService.identities$;

    activeTopic$ = new BehaviorSubject<TopicEnum>('WithdrawalsTopic');

    options$ = this.walletService.wallets$.pipe(map(walletsToOptions), shareReplay(1));

    get walletControl(): FormControl {
        if (isNil(this.form) || isNil(this.form.get('walletID'))) {
            throw new Error(`Can't find walletID control. FormGroup or FormControl doesn't exist`);
        }
        return this.form.get('walletID') as FormControl;
    }

    constructor(
        private identityService: IdentityService,
        private fb: FormBuilder,
        private walletService: WalletService
    ) {}

    ngOnInit(): void {
        this.activeTopic$.pipe(untilDestroyed(this)).subscribe((activeTopic) => {
            if (activeTopic === 'WithdrawalsTopic') {
                this.form.addControl('walletID', this.fb.control(''));
            } else {
                this.form.removeControl('walletID');
            }
            this.form.removeControl('eventTypes');
            this.form.addControl(
                'eventTypes',
                this.fb.array(
                    getEventsByTopic(activeTopic).map((eventName) =>
                        this.fb.group({
                            eventName,
                            selected: false,
                        })
                    ),
                    [oneMustBeSelected]
                )
            );
        });
    }

    changeActiveTopic(topic: TopicEnum): void {
        this.activeTopic$.next(topic);
    }

    get eventTypes(): FormArray {
        return this.form.get('eventTypes') as FormArray;
    }
}
