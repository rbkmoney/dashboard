import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '@dsh/api';
import { Member, Organization } from '@dsh/api-codegen/organizations';
import { UserService } from '@dsh/app/shared';
import { PickMutable } from '@dsh/type-utils';

@Injectable()
export class OrganizationManagementService {
    constructor(private organizationsService: OrganizationsService, private userService: UserService) {}

    getCurrentMember(orgId: Organization['id']): Observable<Member> {
        return this.userService.id$.pipe(
            first(),
            switchMap((userId) => this.organizationsService.getOrgMember(orgId, userId))
        );
    }

    createOrganization(organization: Omit<PickMutable<Organization>, 'owner'>): Observable<Organization> {
        return this.userService.id$.pipe(
            first(),
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
