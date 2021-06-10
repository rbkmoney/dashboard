import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';

import { ClaimChangeset, ClaimsService } from '@dsh/api-codegen/capi';

@Injectable()
export class CapiClaimsService {
    constructor(private claimsService: ClaimsService, private idGenerator: IdGeneratorService) {}

    createClaim(claimChangeset: ClaimChangeset) {
        return this.claimsService.createClaim(this.idGenerator.shortUuid(), claimChangeset);
    }
}
