import { Injectable } from '@angular/core';

import { MembersService, OrgsService, RoleId, RolesService } from '../../api-codegen/organizations';
import { genXRequestID } from '../utils';

@Injectable()
export class OrganizationsService {
    constructor(
        private orgsService: OrgsService,
        private rolesService: RolesService,
        private membersService: MembersService
    ) {}

    getOrganizations(limit?: number, continuationToken?: string) {
        return this.orgsService.listOrgMembership(genXRequestID(), limit, continuationToken);
    }

    getRole(orgId: string, roleId: RoleId) {
        return this.rolesService.getOrgRole(genXRequestID(), orgId, roleId);
    }

    getMember(orgId: string, userId: string) {
        return this.membersService.getOrgMember(genXRequestID(), orgId, userId);
    }
}
