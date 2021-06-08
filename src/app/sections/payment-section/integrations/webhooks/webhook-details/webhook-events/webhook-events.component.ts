import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CustomersTopic, InvoicesTopic, WebhookScope } from '@dsh/api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookEventsComponent {
    @Input()
    scope: WebhookScope;

    get events(): InvoicesTopic.EventTypesEnum[] | CustomersTopic.EventTypesEnum[] {
        switch (this.scope.topic) {
            case 'InvoicesTopic':
                return (this.scope as any as InvoicesTopic).eventTypes;
            case 'CustomersTopic':
                return (this.scope as any as CustomersTopic).eventTypes;
        }
    }
}
