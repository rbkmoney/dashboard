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
import { WritableInvitation } from '@dsh/api/organizations/types/writable-invitation';
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
        return this.orgsService.listOrgMembership(
            this.idGeneratorService.generateRequestID(),
            limit,
            continuationToken
        );
    }

    getOrg(orgId: Organization['id']) {
        return this.orgsService.getOrg(this.idGeneratorService.generateRequestID(), orgId);
    }

    createOrg(org: WritableOrganization) {
        return this.orgsService.createOrg(this.idGeneratorService.generateRequestID(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject) {
        return this.orgsService.patchOrg(this.idGeneratorService.generateRequestID(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest) {
        return this.orgsService.joinOrg(this.idGeneratorService.generateRequestID(), request);
    }

    getOrgRole(orgId: Organization['id'], roleId: RoleId) {
        return this.rolesService.getOrgRole(this.idGeneratorService.generateRequestID(), orgId, roleId);
    }

    getOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.getOrgMember(this.idGeneratorService.generateRequestID(), orgId, userId);
    }

    listOrgMembers(orgId: Organization['id']) {
        return this.membersService.listOrgMembers(this.idGeneratorService.generateRequestID(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string) {
        return this.membersService.expelOrgMember(this.idGeneratorService.generateRequestID(), orgId, userId);
    }

    cancelOrgMembership(orgId: Organization['id']) {
        return this.orgsService.cancelOrgMembership(this.idGeneratorService.generateRequestID(), orgId);
    }

    createInvitation(orgId: Organization['id'], invitation: WritableInvitation) {
        return this.invitationsService.createInvitation(
            this.idGeneratorService.generateRequestID(),
            orgId,
            invitation as Invitation
        );
    }

    listInvitations(orgId: Organization['id']) {
        return this.invitationsService.listInvitations(this.idGeneratorService.generateRequestID(), orgId);
    }
}
