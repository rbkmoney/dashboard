import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
})
export class PaymentsComponent implements OnInit {
    realm: PaymentInstitutionRealm;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.pipe(pluck('realm'), take(1)).subscribe((realm: PaymentInstitutionRealm) => {
            this.realm = realm;
        });
    }
}
