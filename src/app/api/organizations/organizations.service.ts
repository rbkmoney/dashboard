import { Injectable } from '@angular/core';

import {
    InlineObject,
    Invitation,
    InvitationsService,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrgsService,
    RoleId,
    RolesService,
} from '@dsh/api-codegen/organizations';
import { IdGeneratorService } from '@dsh/app/shared';

import { WritableOrganization } from './types/writable-organization';

@Injectable()
export class OrganizationsService {
    constructor(
        private orgsService: OrgsService,
        private rolesService: RolesService,
        private membersService: MembersService,
        private idGeneratorService: IdGeneratorService,
        private invitationsService: InvitationsService
    ) {}

    listOrgMembership(limit?: number, continuationToken?: string) {
        return this.orgsService.listOrgMembership(this.idGeneratorService.generateUUID(), limit, continuationToken);
    }

    getOrg(orgId: Organization['id']) {
        return this.orgsService.getOrg(this.idGeneratorService.generateUUID(), orgId);
    }

    createOrg(org: WritableOrganization) {
        // expects only non-readable fields
        return this.orgsService.createOrg(this.idGeneratorService.generateUUID(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject) {
        return this.orgsService.patchOrg(this.idGeneratorService.generateUUID(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest) {
        return this.orgsService.joinOrg(this.idGeneratorService.generateUUID(), request);
    }

    getOrgRole(orgId: Organization['id'], roleId: RoleId) {
        return this.rolesService.getOrgRole(this.idGeneratorService.generateUUID(), orgId, roleId);
    }

    getOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.getOrgMember(this.idGeneratorService.generateUUID(), orgId, userId);
    }

    listOrgMembers(orgId: Organization['id']) {
        return this.membersService.listOrgMembers(this.idGeneratorService.generateUUID(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.expelOrgMember(this.idGeneratorService.generateUUID(), orgId, userId);
    }

    cancelOrgMembership(orgId: Organization['id']) {
        return this.orgsService.cancelOrgMembership(this.idGeneratorService.generateUUID(), orgId);
    }

    createInvitation(orgId: Organization['id'], invitation: Omit<Invitation, 'id' | 'createdAt'>) {
        return this.invitationsService.createInvitation(
            this.idGeneratorService.generateUUID(),
            orgId,
            invitation as Invitation
        );
    }

    listInvitations(orgId: Organization['id']) {
        return this.invitationsService.listInvitations(this.idGeneratorService.generateUUID(), orgId);
    }
}
