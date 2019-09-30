import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: 'operations.component.html'
})
export class OperationsComponent {
    links = [
        {
            path: 'payments'
        }
        // {
        //     path: 'refunds'
        // },
        // {
        //     path: 'invoices'
        // }
    ];

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((e: RouterEvent) => e.url && e.url.endsWith('operations')))
            .subscribe(e => this.router.navigate([e.url, 'payments']));
    }
}
