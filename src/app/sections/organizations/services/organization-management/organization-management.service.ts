import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { WritableOrganization } from '../../../../api/organizations/types/writable-organization';
import { UserService } from '../../../../shared';

@Injectable()
export class OrganizationManagementService {
    constructor(private organizationsService: OrganizationsService, private userService: UserService) {}

    getMember(id: Organization['id']): Observable<Member> {
        return this.userService.profile$.pipe(
            pluck('username'),
            first(),
            switchMap((userId) => this.organizationsService.getMember(id, userId))
        );
    }

    getMembers(id: Organization['id']): Observable<Member[]> {
        return this.organizationsService.getMembers(id).pipe(pluck('results'));
    }

    createOrganization(organization: Omit<WritableOrganization, 'owner'>): Observable<Organization> {
        return this.userService.profile$.pipe(
            take(1),
            pluck('username'),
            switchMap((owner) =>
                this.organizationsService.createOrganization({
                    owner,
                    ...organization,
                })
            )
        );
    }

    leaveOrganization(orgId: Organization['id']) {
        return this.userService.profile$.pipe(
            first(),
            pluck('id'),
            switchMap((userId) => this.organizationsService.expelMember(orgId, userId))
        );
    }

    isOrganizationOwner(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        const organization$ =
            typeof orgOrOrgId === 'string' ? this.organizationsService.getOrganization(orgOrOrgId) : of(orgOrOrgId);
        return organization$.pipe(
            withLatestFrom(this.userService.profile$),
            map(([{ owner }, { id }]) => owner === id)
        );
    }
}
