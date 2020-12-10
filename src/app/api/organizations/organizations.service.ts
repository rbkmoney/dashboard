import { Injectable } from '@angular/core';

import { MembersService, Organization, OrgsService, RoleId, RolesService } from '../../api-codegen/organizations';
import { UuidGeneratorService } from '../../shared/services/uuid-generator/uuid-generator.service';

@Injectable()
export class OrganizationsService {
    constructor(
        private orgsService: OrgsService,
        private rolesService: RolesService,
        private membersService: MembersService,
        private uuidGeneratorService: UuidGeneratorService
    ) {}

    getOrganizations(limit?: number, continuationToken?: string) {
        return this.orgsService.listOrgMembership(this.uuidGeneratorService.generateUUID(), limit, continuationToken);
    }

    createOrganization(org: Omit<Organization, 'id' | 'createdAt'>) {
        return this.orgsService.createOrg(this.uuidGeneratorService.generateUUID(), org as Organization);
    }

    getRole(orgId: Organization['id'], roleId: RoleId) {
        return this.rolesService.getOrgRole(this.uuidGeneratorService.generateUUID(), orgId, roleId);
    }

    getMember(orgId: Organization['id'], userId: string) {
        return this.membersService.getOrgMember(this.uuidGeneratorService.generateUUID(), orgId, userId);
    }

    getMembers(orgId: Organization['id']) {
        return this.membersService.listOrgMembers(this.uuidGeneratorService.generateUUID(), orgId);
    }
}
