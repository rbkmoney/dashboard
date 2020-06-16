import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

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

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((e: RouterEvent) => e.url && e.url.endsWith('integrations')))
            .subscribe((e) => this.router.navigate([e.url, 'shops']));
    }
}
