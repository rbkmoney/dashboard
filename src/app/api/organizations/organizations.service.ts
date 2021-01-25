import { Injectable } from '@angular/core';

import {
    InlineObject,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrgsService,
    RoleId,
    RolesService,
} from '@dsh/api-codegen/organizations';
import { UuidGeneratorService } from '@dsh/app/shared';

import { WritableOrganization } from './types/writable-organization';

@Injectable()
export class OrganizationsService {
    constructor(
        private orgsService: OrgsService,
        private rolesService: RolesService,
        private membersService: MembersService,
        private uuidGeneratorService: UuidGeneratorService
    ) {}

    listOrgMembership(limit?: number, continuationToken?: string) {
        return this.orgsService.listOrgMembership(this.uuidGeneratorService.generateUUID(), limit, continuationToken);
    }

    getOrg(orgId: Organization['id']) {
        return this.orgsService.getOrg(this.uuidGeneratorService.generateUUID(), orgId);
    }

    createOrg(org: WritableOrganization) {
        // expects only non-readable fields
        return this.orgsService.createOrg(this.uuidGeneratorService.generateUUID(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject) {
        return this.orgsService.patchOrg(this.uuidGeneratorService.generateUUID(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest) {
        return this.orgsService.joinOrg(this.uuidGeneratorService.generateUUID(), request);
    }

    getOrgRole(orgId: Organization['id'], roleId: RoleId) {
        return this.rolesService.getOrgRole(this.uuidGeneratorService.generateUUID(), orgId, roleId);
    }

    getOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.getOrgMember(this.uuidGeneratorService.generateUUID(), orgId, userId);
    }

    listOrgMembers(orgId: Organization['id']) {
        return this.membersService.listOrgMembers(this.uuidGeneratorService.generateUUID(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.expelOrgMember(this.uuidGeneratorService.generateUUID(), orgId, userId);
    }
}
