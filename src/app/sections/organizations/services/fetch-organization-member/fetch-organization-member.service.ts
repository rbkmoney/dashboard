import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, pluck, switchMap } from 'rxjs/operators';

import { OrganizationsService } from '../../../../api';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { UserService } from '../../../../shared';
import { mockMember } from '../../tests/mock-member';

@Injectable()
export class FetchOrganizationMemberService {
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

    leaveOrganization(orgId: Organization['id']) {
        return this.userService.profile$.pipe(
            first(),
            pluck('id'),
            switchMap((userId) => this.organizationsService.expelMember(orgId, userId))
        );
    }
}
