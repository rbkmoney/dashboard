import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MemberRole } from '@dsh/api-codegen/organizations';

import { RoleGroup } from './types/role-group';
import { getRolesByGroup } from './utils/get-roles-by-group';

@Component({
    selector: 'dsh-organization-roles',
    templateUrl: 'organization-roles.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationRolesComponent {
    @Input() set roles(roles: MemberRole[]) {
        this.rolesByGroup = getRolesByGroup(roles);
    }

    rolesByGroup: RoleGroup[] = [];
}
