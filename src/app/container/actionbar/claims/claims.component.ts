import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimsService } from './claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [ClaimsService]
})
export class ClaimsComponent {
    @Output() menuItemSelected = new EventEmitter();

    @Output() navigatedToAllClaims = new EventEmitter();

    claims$ = this.claimsService.claims$;
    isLoading$ = this.claimsService.isLoading$;
    error$ = this.claimsService.error$;
    noClaims$ = this.claimsService.noClaims$;

    constructor(private router: Router, private claimsService: ClaimsService) {}

    navigateToClaims() {
        this.navigatedToAllClaims.next();
        this.router.navigate(['claims']);
    }
}
