import { MemberRole, RoleId } from '../../../../api-codegen/organizations';
import { RoleGroup, RoleGroupScope } from '../types/role-group';

const ROLE_PRIORITY_DESC: { [N in RoleId]: number } = {
    Administrator: 0,
    Accountant: 1,
    Integrator: 2,
    Manager: 3,
};

export function getRolesByGroup(roles: MemberRole[]): RoleGroup[] {
    return roles
        .reduce<RoleGroup[]>((groups, role) => {
            let group: RoleGroup = groups.find((g) => g.id === role.roleId);
            if (!group) {
                group = { id: role.roleId, scopes: [] };
                groups.push(group);
            }
            const scope: RoleGroupScope = group.scopes.find((s) => s.id === role.scope.id) ?? {
                id: role.scope.id,
                resourcesIds: [],
            };
            scope.resourcesIds.push(role.scope.resourceId);
            return groups;
        }, [])
        .sort((a, b) => ROLE_PRIORITY_DESC[a.id] - ROLE_PRIORITY_DESC[b.id]);
}
