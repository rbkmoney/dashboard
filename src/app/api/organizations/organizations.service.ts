import { Injectable } from '@angular/core';

import {
    InlineObject,
    InvitationRequest,
    InvitationsService,
    MemberRole,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrgsService,
    RoleId,
    RolesService,
} from '@dsh/api-codegen/organizations';
import { IdGeneratorService } from '@dsh/app/shared';
import { PickMutable } from '@dsh/type-utils';

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

    // TODO: Organization.owner should be readonly (maybe fix swag)
    createOrg(org: Omit<PickMutable<Organization>, 'owner'>) {
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

    assignMemberRole(orgId: string, userId: string, memberRole: MemberRole) {
        return this.membersService.assignMemberRole(
            this.idGeneratorService.generateRequestID(),
            orgId,
            userId,
            memberRole
        );
    }

    removeMemberRole(orgId: string, userId: string, memberRole: MemberRole) {
        return this.membersService.removeMemberRole(
            this.idGeneratorService.generateRequestID(),
            orgId,
            userId,
            memberRole
        );
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

    createInvitation(orgId: Organization['id'], invitation: InvitationRequest) {
        return this.invitationsService.createInvitation(this.idGeneratorService.generateRequestID(), orgId, invitation);
    }

    listInvitations(orgId: Organization['id']) {
        return this.invitationsService.listInvitations(this.idGeneratorService.generateRequestID(), orgId);
    }
}
