import { Component, Inject, Input, ViewChild } from '@angular/core';

import { ExpandPanelComponent } from '@dsh/components/layout';

import { Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-webhook-card',
    templateUrl: 'webhook-card.component.html'
})
export class WebhookCardComponent {
    @Input()
    webhook: Webhook;

    @ViewChild('expandPanel', { static: false }) expandPanel: ExpandPanelComponent;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
