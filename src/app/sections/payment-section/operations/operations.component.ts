import { Component } from '@angular/core';

@Component({
    templateUrl: 'operations.component.html',
})
export class OperationsComponent {
    links = [
        {
            path: 'payments',
        },
        {
            path: 'invoices',
        },
        {
            path: 'refunds',
        },
    ];
}
