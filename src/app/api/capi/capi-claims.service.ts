import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ClaimsService, ClaimChangeset, Claim } from '../../api-codegen/capi';
import { genXRequestID } from '../utils';
import { createTestShopClaimChangeset } from './utils';

@Injectable()
export class CAPIClaimsService {
    constructor(private claimsService: ClaimsService) {}

    createClaim(claimChangeset: ClaimChangeset) {
        return this.claimsService.createClaim(genXRequestID(), claimChangeset);
    }

    createTestShop(): Observable<Claim> {
        return this.createClaim(createTestShopClaimChangeset());
    }
}
