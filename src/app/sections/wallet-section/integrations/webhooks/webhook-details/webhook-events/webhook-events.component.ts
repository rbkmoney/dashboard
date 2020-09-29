import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DestinationsTopic, WithdrawalsTopic } from '../../../../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-webhook-events',
    templateUrl: 'webhook-events.component.html',
    styleUrls: ['webhook-events.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookEventsComponent {
    @Input()
    events: WithdrawalsTopic.EventTypesEnum[] | DestinationsTopic.EventTypesEnum[];
}
