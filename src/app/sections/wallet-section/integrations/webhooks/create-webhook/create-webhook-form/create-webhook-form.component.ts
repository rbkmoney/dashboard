import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { oneMustBeSelected } from '@dsh/components/form-controls';

import { WebhookScope } from '../../../../../../api-codegen/wallet-api/swagger-codegen';
import { IdentityService } from '../../../../../../api/identity';
import { WalletService } from '../../../../../../api/wallet';
import { getEventsByTopic } from '../get-events-by-topic';
import TopicEnum = WebhookScope.TopicEnum;

@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
})
export class CreateWebhookFormComponent implements OnInit {
    @Input()
    form: FormGroup;

    wallets$ = this.walletService.wallets$;

    identities$ = this.identityService.identities$;

    activeTopic$ = new BehaviorSubject<TopicEnum>('WithdrawalsTopic');

    constructor(
        private walletService: WalletService,
        private identityService: IdentityService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.activeTopic$.subscribe((activeTopic) => {
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

    changeActiveTopic(topic: TopicEnum) {
        this.activeTopic$.next(topic);
    }

    get eventTypes() {
        return this.form.get('eventTypes') as FormArray;
    }
}
