import { Component } from '@angular/core';

@Component({
    templateUrl: 'integrations.component.html',
})
export class IntegrationsComponent {
    links = [
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
