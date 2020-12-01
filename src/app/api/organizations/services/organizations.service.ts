import { Injectable } from '@angular/core';

import { OrgsService } from '../../../api-codegen/organizations';
import { genXRequestID } from '../../utils';

@Injectable()
export class OrganizationsService {
    constructor(private orgsService: OrgsService) {}

    getOrganizations(limit?: number, continuationToken?: string) {
        return this.orgsService.listOrgMembership(genXRequestID(), limit, continuationToken);
    }
}
