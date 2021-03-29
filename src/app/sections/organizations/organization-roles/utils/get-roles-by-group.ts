import { MemberRole } from '@dsh/api-codegen/organizations';

import { RoleGroup, RoleGroupScope } from '../types/role-group';
import { ROLE_PRIORITY_DESC } from './role-priority-desc';

export function getRolesByGroup(roles: MemberRole[]): RoleGroup[] {
    return roles
        .reduce<RoleGroup[]>((groups, role) => {
            let group: RoleGroup = groups.find((g) => g.id === role.roleId);
            if (!group) {
                group = { id: role.roleId, scopes: [] };
                groups.push(group);
            }
            let scope: RoleGroupScope = group.scopes.find((s) => s.id === role.scope.id);
            if (!scope) {
                scope = {
                    id: role.scope.id,
                    resourcesIds: [],
                };
                group.scopes.push(scope);
            }
            scope.resourcesIds.push(role.scope.resourceId);
            return groups;
        }, [])
        .sort((a, b) => ROLE_PRIORITY_DESC[a.id] - ROLE_PRIORITY_DESC[b.id]);
}
