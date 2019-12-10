import { Component, Output, EventEmitter } from '@angular/core';

import { ClaimsService } from './claims.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [ClaimsService]
})
export class ClaimsComponent {
    @Output() menuItemSelected = new EventEmitter();

    claims$ = this.claimsService.claims$;
    isLoading$ = this.claimsService.isLoading$;
    error$ = this.claimsService.error$;
    noClaims$ = this.claimsService.noClaims$;

    constructor(
        private router: Router,
        private claimsService: ClaimsService
    ) {}

    navigateToClaims() {
        this.router.navigate(['claims']);
    }
}
