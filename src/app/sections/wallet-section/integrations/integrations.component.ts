import { Component } from '@angular/core';

@Component({
    templateUrl: 'integrations.component.html',
    styleUrls: ['integrations.component.scss'],
})
export class IntegrationsComponent {
    links = [
        {
            path: 'webhooks',
        },
    ];
}
