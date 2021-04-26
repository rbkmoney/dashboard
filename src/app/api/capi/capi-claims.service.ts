import { Injectable } from '@angular/core';

import { ClaimChangeset, ClaimsService } from '@dsh/api-codegen/capi';

import { genXRequestID } from '../utils';

@Injectable()
export class CapiClaimsService {
    constructor(private claimsService: ClaimsService) {}

    createClaim(claimChangeset: ClaimChangeset) {
        return this.claimsService.createClaim(genXRequestID(), claimChangeset);
    }
}
