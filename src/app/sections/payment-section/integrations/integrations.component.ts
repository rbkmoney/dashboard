import { Component } from '@angular/core';

@Component({
    templateUrl: 'integrations.component.html',
    styleUrls: ['integrations.component.scss'],
})
export class IntegrationsComponent {
    links = [
        {
            path: 'shops',
        },
        {
            path: 'payment-link',
        },
        {
            path: 'api-key',
        },
        {
            path: 'webhooks',
        },
    ];
}
