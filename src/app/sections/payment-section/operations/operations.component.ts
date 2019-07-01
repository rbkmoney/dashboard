import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OperationsComponent {
    dictionaryBasePath = 'sections.payment-section.operations';
    links = [
        {
            path: 'payments',
            label: `${this.dictionaryBasePath}.tabs.payments`
        },
        {
            path: 'refunds',
            label: `${this.dictionaryBasePath}.tabs.refunds`
        },
        {
            path: 'invoices',
            label: `${this.dictionaryBasePath}.tabs.invoices`
        }
    ];

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((e: RouterEvent) => e.url && e.url.endsWith('operations')))
            .subscribe(e => this.router.navigate([e.url, 'payments']));
    }
}
