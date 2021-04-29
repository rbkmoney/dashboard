import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { WebhookScope } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { IdentityService } from '@dsh/api/identity';
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

    constructor(private identityService: IdentityService, private fb: FormBuilder) {}

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
