import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MemberRole } from '@dsh/api-codegen/organizations';
import { coerceBoolean } from '@dsh/utils';

import { RoleGroup } from './types/role-group';
import { groupRoles } from './utils/group-roles';

@Component({
    selector: 'dsh-organization-roles',
    templateUrl: 'organization-roles.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationRolesComponent {
    @Input() @coerceBoolean isOwner: boolean;

    @Input() set roles(roles: MemberRole[]) {
        this.rolesByGroup = groupRoles(roles);
    }

    rolesByGroup: RoleGroup[] = [];
}
