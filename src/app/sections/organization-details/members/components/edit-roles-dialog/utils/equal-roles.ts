import { MemberRole } from '@dsh/api-codegen/organizations';
import { PartialReadonly } from '@dsh/type-utils';

export function equalRoles(a: PartialReadonly<MemberRole>, b: PartialReadonly<MemberRole>) {
    return (
        (a && b && a.id === b.id) ||
        (a.roleId === b.roleId &&
            ((!a.scope && !b.scope) || (a.scope.id === b.scope.id && a.scope.resourceId === b.scope.resourceId)))
    );
}
