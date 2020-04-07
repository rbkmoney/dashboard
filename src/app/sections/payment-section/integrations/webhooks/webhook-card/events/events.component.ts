import { Component, Inject, Input } from '@angular/core';

import { InvoicesTopic } from '../../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../../constants';
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Component({
    selector: 'dsh-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss']
})
export class EventsComponent {
    @Input()
    events: InvoicesEventTypesEnum[];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
