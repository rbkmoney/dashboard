import { MemberRole } from '@dsh/api-codegen/organizations';
import { PartialReadonly } from '@dsh/type-utils';

export function hasRole(roles: PartialReadonly<MemberRole>[], role: PartialReadonly<MemberRole>) {
    return roles.findIndex(
        (r) =>
            r.id === role.id ||
            (r.roleId === role.roleId &&
                r.scope?.id === role.scope?.id &&
                r.scope?.resourceId === role.scope?.resourceId)
    );
}
