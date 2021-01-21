import { Injectable } from '@angular/core';

import {
    InlineObject,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrgsService,
    RoleId,
    RolesService,
} from '../../api-codegen/organizations';
import { UuidGeneratorService } from '../../shared/services/uuid-generator/uuid-generator.service';
import { WritableOrganization } from './types/writable-organization';

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

    getOrganization(orgId: Organization['id']) {
        return this.orgsService.getOrg(this.uuidGeneratorService.generateUUID(), orgId);
    }

    createOrganization(org: WritableOrganization) {
        return this.orgsService.createOrg(
            this.uuidGeneratorService.generateUUID(),
            // expects only non-readable fields
            org as Organization
        );
    }

    patchOrganization(orgId: Organization['id'], org: InlineObject) {
        return this.orgsService.patchOrg(this.uuidGeneratorService.generateUUID(), orgId, org);
    }

    joinOrganization(request: OrganizationJoinRequest) {
        return this.orgsService.joinOrg(this.uuidGeneratorService.generateUUID(), request);
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

    expelMember(orgId: Organization['id'], userId: string) {
        return this.membersService.expelOrgMember(this.uuidGeneratorService.generateUUID(), orgId, userId);
    }
}
