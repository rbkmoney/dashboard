import { Component, Inject, Input } from '@angular/core';

import { CustomersTopic, InvoicesTopic } from '../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';
type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Component({
    selector: 'dsh-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss']
})
export class EventsComponent {
    @Input()
    events: InvoicesEventTypesEnum[] | CustomersEventTypesEnum[];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
