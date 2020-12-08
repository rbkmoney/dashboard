import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import { Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

import { ComponentChanges } from '../../../../../type-utils';
import { Member, Organization } from '../../../../api-codegen/organizations';
import { FetchOrganizationMemberService } from '../../services/fetch-organization-member/fetch-organization-member.service';

@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchOrganizationMemberService],
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: Organization;

    member$: Observable<Member>;
    membersCount$: Observable<number>;

    constructor(private fetchOrganizationMemberService: FetchOrganizationMemberService) {}

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (!isNil(organization?.currentValue)) {
            this.initMember(organization.currentValue.id);
            this.initMembersCount(organization.currentValue.id);
        }
    }

    private initMember(id: Organization['id']) {
        this.member$ = this.fetchOrganizationMemberService.getMember(this.organization.id).pipe(shareReplay(1));
    }

    private initMembersCount(id: Organization['id']) {
        this.membersCount$ = this.fetchOrganizationMemberService.getMembers(id).pipe(pluck('length'), shareReplay(1));
    }
}
