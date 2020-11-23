import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { oneMustBeSelected } from '@dsh/components/form-controls';

import { ApiShopsService } from '../../../../../../api';
import TopicEnum = WebhookScope.TopicEnum;
import { WebhookScope } from '../../../../../../api-codegen/capi/swagger-codegen';
import { getEventsByTopic } from '../get-events-by-topic';

@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
    providers: [ApiShopsService],
})
export class CreateWebhookFormComponent implements OnInit {
    @Input()
    form: FormGroup;

    shops$ = this.shopService.shops$;

    activeTopic$ = new BehaviorSubject<TopicEnum>('InvoicesTopic');

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {}

    ngOnInit() {
        this.activeTopic$.subscribe((activeTopic) => {
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
