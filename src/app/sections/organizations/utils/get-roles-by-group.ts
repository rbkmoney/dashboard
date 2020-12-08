import { MemberRole, RoleId } from '../../../api-codegen/organizations';
import { RoleGroup } from '../types/role-group';

const rolePriorityDesc: { [N in RoleId]: number } = {
    Administrator: 0,
    Accountant: 1,
    Integrator: 2,
    Manager: 3,
};

export function getRolesByGroup(roles: MemberRole[]): RoleGroup[] {
    return roles
        .reduce((groups, role) => {
            let group = groups.find((g) => g.id === role.roleId);
            if (!group) {
                group = { id: role.roleId, scopes: [] };
                groups.push(group);
            }
            let scope = group.scopes.find((s) => s.id === role.scope.id);
            if (!scope) {
                scope = { id: role.scope.id, resourcesIds: [] };
                group.scopes.push(scope);
            }
            scope.resourcesIds.push(role.scope.resourceId);
            return groups;
        }, [] as RoleGroup[])
        .sort((a, b) => rolePriorityDesc[a.id] - rolePriorityDesc[b.id]);
}
