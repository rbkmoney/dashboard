import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, pluck, switchMap, take } from 'rxjs/operators';

import { OrganizationsService, WritableOrganization } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { UserService } from '@dsh/app/shared';

@Injectable()
export class OrganizationManagementService {
    constructor(private organizationsService: OrganizationsService, private userService: UserService) {}

    getMember(id: Organization['id']): Observable<Member> {
        return this.userService.id$.pipe(
            first(),
            switchMap((userId) => this.organizationsService.getOrgMember(id, userId))
        );
    }

    getMembers(id: Organization['id']): Observable<Member[]> {
        return this.organizationsService.listOrgMembers(id).pipe(pluck('results'));
    }

    createOrganization(organization: Omit<WritableOrganization, 'owner'>): Observable<Organization> {
        return this.userService.profile$.pipe(
            take(1),
            pluck('username'),
            switchMap((owner) =>
                this.organizationsService.createOrg({
                    owner,
                    ...organization,
                })
            )
        );
    }

    isOrganizationOwner(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        const organization$ =
            typeof orgOrOrgId === 'string' ? this.organizationsService.getOrg(orgOrOrgId) : of(orgOrOrgId);
        return combineLatest([organization$, this.userService.id$]).pipe(
            first(),
            map(([{ owner }, id]) => owner === id)
        );
    }
}
