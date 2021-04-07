import { MemberRole } from '@dsh/api-codegen/organizations';

export function hasRole(roles: MemberRole[], role: MemberRole) {
    return roles.findIndex(
        (r) =>
            r.roleId === role.roleId && r.scope?.id === role.scope?.id && r.scope?.resourceId === role.scope?.resourceId
    );
}
