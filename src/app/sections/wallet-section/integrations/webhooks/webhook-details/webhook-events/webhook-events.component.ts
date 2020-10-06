import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
    DestinationsTopic,
    WebhookScope,
    WithdrawalsTopic,
} from '../../../../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookEventsComponent {
    @Input()
    scope: WebhookScope;

    get events(): WithdrawalsTopic.EventTypesEnum[] | DestinationsTopic.EventTypesEnum[] {
        switch (this.scope.topic) {
            case 'WithdrawalsTopic':
                return ((this.scope as any) as WithdrawalsTopic).eventTypes;
            case 'DestinationsTopic':
                return ((this.scope as any) as DestinationsTopic).eventTypes;
        }
    }
}
