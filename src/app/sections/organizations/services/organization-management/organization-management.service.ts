import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, pluck, switchMap, take } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { WritableOrganization } from '../../../../api/organizations/types/writable-organization';
import { UserService } from '../../../../shared';
import { mockMember } from '../../tests/mock-member';
import { mockOrg } from '../../tests/mock-org';

@Injectable()
export class OrganizationManagementService {
    constructor(
        // tslint:disable-next-line
        private organizationsService: OrganizationsService,
        // tslint:disable-next-line
        private userService: UserService
    ) {}

    getMember(id: Organization['id']): Observable<Member> {
        // return this.userService.profile$.pipe(
        //     pluck('id'),
        //     take(1),
        //     switchMap((userId) => this.organizationsService.getMember(id, userId))
        // );
        return of(mockMember);
    }

    getMembers(id: Organization['id']): Observable<Member[]> {
        // return this.organizationsService.getMembers(id).pipe(pluck('results'));
        return of(new Array(5).fill(mockMember));
    }

    createOrganization(organization: Omit<WritableOrganization, 'owner'>): Observable<Organization> {
        return this.userService.profile$.pipe(
            take(1),
            pluck('id'),
            // TODO: change after fix Organization['owner'] type
            switchMap((owner: never) =>
                this.organizationsService.createOrganization({
                    owner,
                    ...organization,
                })
            )
        );
    }

    getOrganization(id: Organization['id']): Observable<Organization> {
        // return this.userService.profile$.pipe(
        //     pluck('id'),
        //     take(1),
        //     switchMap((userId) => this.organizationsService.getMember(id, userId))
        // );
        return of(mockOrg);
    }

    leaveOrganization(orgId: Organization['id']) {
        return this.userService.profile$.pipe(
            first(),
            pluck('id'),
            switchMap((userId) => this.organizationsService.expelMember(orgId, userId))
        );
    }

    isOrganizationOwner(orgOrOrgId: Organization['id'] | Organization): Observable<boolean> {
        // const organization$ =
        //     typeof orgOrOrgId === 'string' ? this.organizationsService.getOrganization(orgOrOrgId) : of(orgOrOrgId);
        // return organization$.pipe(
        //     withLatestFrom(this.userService.profile$),
        //     map(([{ owner }, { id }]) => owner === id)
        // );
        return of(true);
    }
}
