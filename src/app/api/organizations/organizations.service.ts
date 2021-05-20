import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';
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

    listOrgMembership(limit?: number, continuationToken?: string): Observable<OrganizationSearchResult> {
        const xRequestId = this.createApiCallContext('listOrgMembership');
        return this.orgsService.listOrgMembership(xRequestId, limit, continuationToken);
    }

    getOrg(orgId: Organization['id']): Observable<Organization> {
        return this.orgsService.getOrg(this.idGeneratorService.generateRequestID(), orgId);
    }

    // TODO: Organization.owner should be readonly (maybe fix swag)
    createOrg(org: Omit<PickMutable<Organization>, 'owner'>): Observable<Organization> {
        return this.orgsService.createOrg(this.idGeneratorService.generateRequestID(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject): Observable<Organization> {
        return this.orgsService.patchOrg(this.idGeneratorService.generateRequestID(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest): Observable<OrganizationMembership> {
        return this.orgsService.joinOrg(this.idGeneratorService.generateRequestID(), request);
    }

    getOrgRole(orgId: Organization['id'], roleId: RoleId): Observable<Role> {
        return this.rolesService.getOrgRole(this.idGeneratorService.generateRequestID(), orgId, roleId);
    }

    getOrgMember(orgId: Organization['id'], userId: string): Observable<Member> {
        return this.membersService.getOrgMember(this.idGeneratorService.generateRequestID(), orgId, userId);
    }

    assignMemberRole(orgId: string, userId: string, memberRole: PickMutable<MemberRole>): Observable<MemberRole> {
        return this.membersService.assignMemberRole(
            this.idGeneratorService.generateRequestID(),
            orgId,
            userId,
            memberRole as MemberRole
        );
    }

    removeMemberRole(orgId: string, userId: string, memberRoleId: MemberRole['id']): Observable<any> {
        return this.membersService.removeMemberRole(
            this.idGeneratorService.generateRequestID(),
            orgId,
            userId,
            memberRoleId
        );
    }

    listOrgMembers(orgId: Organization['id']): Observable<MemberOrgListResult> {
        return this.membersService.listOrgMembers(this.idGeneratorService.generateRequestID(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string): Observable<any> {
        return this.membersService.expelOrgMember(this.idGeneratorService.generateRequestID(), orgId, userId);
    }

    cancelOrgMembership(orgId: Organization['id']): Observable<any> {
        return this.orgsService.cancelOrgMembership(this.idGeneratorService.generateRequestID(), orgId);
    }

    createInvitation(orgId: Organization['id'], invitation: InvitationRequest): Observable<Invitation> {
        return this.invitationsService.createInvitation(this.idGeneratorService.generateRequestID(), orgId, invitation);
    }

    listInvitations(orgId: Organization['id']): Observable<InvitationListResult> {
        return this.invitationsService.listInvitations(this.idGeneratorService.generateRequestID(), orgId);
    }

    revokeInvitation(
        orgId: Organization['id'],
        invitationId: Invitation['id'],
        status?: InlineObject1
    ): Observable<any> {
        return this.invitationsService.revokeInvitation(
            this.idGeneratorService.generateRequestID(),
            orgId,
            invitationId,
            status
        );
    }

    private createApiCallContext(methodName: string): string {
        const xRequestId = this.idGeneratorService.generateRequestID();
        Sentry.addBreadcrumb({
            level: Sentry.Severity.Info,
            message: 'Api call context',
            data: {
                methodName,
                xRequestId,
            },
        });
        return xRequestId;
    }
}
