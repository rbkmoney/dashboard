import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'invoice-details.component.html'
})
export class InvoiceDetailsComponent {
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(p => console.log('InvoiceDetailsComponent route params:', p));
    }
}
