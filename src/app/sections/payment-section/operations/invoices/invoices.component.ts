import { Component } from '@angular/core';

import { InvoiceSearchFormValue } from './search-form';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html'
})
export class InvoicesComponent {
    search($event: InvoiceSearchFormValue) {
        console.log($event);
    }
}
