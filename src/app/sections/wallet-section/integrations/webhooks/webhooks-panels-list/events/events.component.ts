import { Component, Input } from '@angular/core';

import { DestinationsTopic, WithdrawalsTopic } from '../../../../../../api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss'],
})
export class EventsComponent {
    @Input()
    events: WithdrawalsTopic.EventTypesEnum[] | DestinationsTopic.EventTypesEnum[];
}
