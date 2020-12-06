import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { ComponentChanges } from '../../../../../type-utils';
import { OrganizationMembership } from '../../../../api-codegen/organizations';
import { RoleGroup } from '../../types/role-group';
import { getRolesByGroup } from '../../utils/get-roles-by-group';

@Component({
    selector: 'dsh-organization',
    templateUrl: 'organization.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent implements OnChanges {
    @Input() organization: OrganizationMembership;

    rolesByGroup: RoleGroup[] = [];

    ngOnChanges({ organization }: ComponentChanges<OrganizationComponent>) {
        if (organization) {
            this.rolesByGroup = getRolesByGroup(organization.currentValue.member.roles);
        }
    }
}
