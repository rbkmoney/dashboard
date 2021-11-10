import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import {
    InlineObject,
    InlineObject1,
    Invitation,
    InvitationListResult,
    InvitationRequest,
    InvitationsService,
    Member,
    MemberOrgListResult,
    MemberRole,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrganizationMembership,
    OrganizationSearchResult,
    OrgsService,
    Role,
    RoleId,
    RolesService,
    InvitationStatusName,
    MemberContext,
} from '@dsh/api-codegen/organizations';
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

    listOrgMembership(limit?: number, continuationToken?: string): Observable<OrganizationSearchResult> {
        return this.orgsService.listOrgMembership(this.idGeneratorService.shortUuid(), limit, continuationToken);
    }

    getOrg(orgId: Organization['id']): Observable<Organization> {
        return this.orgsService.getOrg(this.idGeneratorService.shortUuid(), orgId);
    }

    // TODO: Organization.owner should be readonly (maybe fix swag)
    createOrg(org: Omit<PickMutable<Organization>, 'owner'>): Observable<Organization> {
        return this.orgsService.createOrg(this.idGeneratorService.shortUuid(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject): Observable<Organization> {
        return this.orgsService.patchOrg(this.idGeneratorService.shortUuid(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest): Observable<OrganizationMembership> {
        return this.orgsService.joinOrg(this.idGeneratorService.shortUuid(), request);
    }

    getOrgRole(orgId: Organization['id'], roleId: RoleId): Observable<Role> {
        return this.rolesService.getOrgRole(this.idGeneratorService.shortUuid(), orgId, roleId);
    }

    getOrgMember(orgId: Organization['id'], userId: string): Observable<Member> {
        return this.membersService.getOrgMember(this.idGeneratorService.shortUuid(), orgId, userId);
    }

    assignMemberRole(orgId: string, userId: string, memberRole: PickMutable<MemberRole>): Observable<MemberRole> {
        return this.membersService.assignMemberRole(
            this.idGeneratorService.shortUuid(),
            orgId,
            userId,
            memberRole as MemberRole
        );
    }

    removeMemberRole(orgId: string, userId: string, memberRoleId: MemberRole['id']): Observable<void> {
        return this.membersService.removeMemberRole(this.idGeneratorService.shortUuid(), orgId, userId, memberRoleId);
    }

    listOrgMembers(orgId: Organization['id']): Observable<MemberOrgListResult> {
        return this.membersService.listOrgMembers(this.idGeneratorService.shortUuid(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string): Observable<void> {
        return this.membersService.expelOrgMember(this.idGeneratorService.shortUuid(), orgId, userId);
    }

    cancelOrgMembership(orgId: Organization['id']): Observable<void> {
        return this.orgsService.cancelOrgMembership(this.idGeneratorService.shortUuid(), orgId);
    }

    createInvitation(orgId: Organization['id'], invitation: InvitationRequest): Observable<Invitation> {
        return this.invitationsService.createInvitation(this.idGeneratorService.shortUuid(), orgId, invitation);
    }

    listInvitations(orgId: Organization['id'], status?: InvitationStatusName): Observable<InvitationListResult> {
        return this.invitationsService.listInvitations(this.idGeneratorService.shortUuid(), orgId, status);
    }

    revokeInvitation(
        orgId: Organization['id'],
        invitationId: Invitation['id'],
        status?: InlineObject1
    ): Observable<void> {
        return this.invitationsService.revokeInvitation(
            this.idGeneratorService.shortUuid(),
            orgId,
            invitationId,
            status
        );
    }

    getContext(): Observable<MemberContext> {
        return this.orgsService.getContext(this.idGeneratorService.shortUuid());
    }

    switchContext(organizationId: string): Observable<void> {
        return this.orgsService.switchContext(this.idGeneratorService.shortUuid(), { organizationId });
    }
}
