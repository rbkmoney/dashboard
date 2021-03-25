import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization, RoleId } from '@dsh/api-codegen/organizations';
import { KeycloakTokenInfoService } from '@dsh/app/shared';

@Injectable()
export class OrganizationManagementService {
    constructor(
        private organizationsService: OrganizationsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    getCurrentMember(orgId: Organization['id']): Observable<Member> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            switchMap((userId) => this.organizationsService.getOrgMember(orgId, userId))
        );
    }

    isOrganizationOwner(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        const organization$ =
            typeof orgOrOrgId === 'string' ? this.organizationsService.getOrg(orgOrOrgId) : of(orgOrOrgId);
        return combineLatest([organization$, this.keycloakTokenInfoService.partyID$]).pipe(
            map(([{ owner }, id]) => owner === id)
        );
    }

    isOrganizationAdmin(orgId: Organization['id']): Observable<boolean> {
        return this.getCurrentMember(orgId).pipe(
            map((member) => member.roles.findIndex((r) => r.roleId === RoleId.Administrator) !== -1)
        );
    }

    hasAdminAccess(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        return combineLatest([
            this.isOrganizationAdmin(typeof orgOrOrgId === 'string' ? orgOrOrgId : orgOrOrgId.id),
            this.isOrganizationOwner(orgOrOrgId),
        ]).pipe(map(([isAdmin, isOwner]) => isAdmin || isOwner));
    }
}
