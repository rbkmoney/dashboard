import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

class Tab {
    name: string;
    url: string;
}

@Component({
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OperationsComponent {

    tabs: Tab[] = [
        {
            name: 'sections.operations.payments.title',
            url: 'payments'
        },
        {
            name: 'sections.operations.refunds.title',
            url: 'refunds'
        },
        {
            name: 'sections.operations.invoices.title',
            url: 'invoices'
        }
    ];

    constructor(private router: Router) {
    }


    tabChanged(tab: number) {
        this.router.navigate(['operations', `${this.tabs[tab].url}`]);
    }
}
