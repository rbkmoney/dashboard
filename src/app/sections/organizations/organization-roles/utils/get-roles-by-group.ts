import { MemberRole, RoleId } from '../../../../api-codegen/organizations';
import { RoleGroup, RoleGroupScope } from '../types/role-group';

const ROLE_PRIORITY_DESC: { [N in RoleId]: number } = {
    Administrator: 0,
    Accountant: 1,
    Integrator: 2,
    Manager: 3,
};

function addRoleGroup(groups: RoleGroup[], role: MemberRole): RoleGroup {
    let group: RoleGroup = groups.find((g) => g.id === role.roleId);
    if (!group) {
        group = { id: role.roleId, scopes: [] };
        groups.push(group);
    }
    return group;
}

function addRoleGroupScope(group: RoleGroup, role: MemberRole): void {
    let scope: RoleGroupScope = group.scopes.find((s) => s.id === role.scope.id);
    if (!scope) {
        scope = { id: role.scope.id, resourcesIds: [] };
        group.scopes.push(scope);
    }
    scope.resourcesIds.push(role.scope.resourceId);
}

export function getRolesByGroup(roles: MemberRole[]): RoleGroup[] {
    return roles
        .reduce((groups, role) => {
            const group = addRoleGroup(groups, role);
            addRoleGroupScope(group, role);
            return groups;
        }, [] as RoleGroup[])
        .sort((a, b) => ROLE_PRIORITY_DESC[a.id] - ROLE_PRIORITY_DESC[b.id]);
}
