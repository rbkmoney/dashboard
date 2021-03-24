import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { KeycloakTokenInfoService } from '@dsh/app/shared';

@Injectable()
export class OrganizationManagementService {
    constructor(
        private organizationsService: OrganizationsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    getCurrentMember(orgId: Organization['id']): Observable<Member> {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            switchMap((userId) => this.organizationsService.getOrgMember(orgId, userId))
        );
    }

    isOrganizationOwner(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        const organization$ =
            typeof orgOrOrgId === 'string' ? this.organizationsService.getOrg(orgOrOrgId) : of(orgOrOrgId);
        return combineLatest([organization$, this.keycloakTokenInfoService.partyID$]).pipe(
            first(),
            map(([{ owner }, id]) => owner === id)
        );
    }
}
