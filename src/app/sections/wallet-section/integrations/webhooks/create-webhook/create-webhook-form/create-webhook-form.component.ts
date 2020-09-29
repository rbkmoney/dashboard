import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Identity, Wallet, WebhookScope } from '../../../../../../api-codegen/wallet-api/swagger-codegen';
import TopicEnum = WebhookScope.TopicEnum;

@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
})
export class CreateWebhookFormComponent {
    @Input()
    form: FormGroup;

    @Input()
    identities: Identity[];

    @Input()
    wallets: Wallet[];

    @Input()
    activeTopic: TopicEnum;

    @Output()
    activeTopicChange = new EventEmitter<TopicEnum>();

    changeActiveTopic(topic: TopicEnum) {
        this.activeTopicChange.emit(topic);
    }

    get eventTypes() {
        return this.form.get('eventTypes') as FormArray;
    }
}
