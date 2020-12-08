import { Injectable } from '@angular/core';

import { MembersService, Organization, OrgsService, RoleId, RolesService } from '../../api-codegen/organizations';
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

    getRole(orgId: Organization['id'], roleId: RoleId) {
        return this.rolesService.getOrgRole(genXRequestID(), orgId, roleId);
    }

    getMember(orgId: Organization['id'], userId: string) {
        return this.membersService.getOrgMember(genXRequestID(), orgId, userId);
    }

    getMembers(orgId: Organization['id']) {
        return this.membersService.listOrgMembers(genXRequestID(), orgId);
    }
}
