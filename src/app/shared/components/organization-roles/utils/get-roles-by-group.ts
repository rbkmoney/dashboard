import { MemberRole, RoleId } from '@dsh/api-codegen/organizations';
import { PartialReadonly } from '@dsh/type-utils';

import { RoleGroup } from '../types/role-group';

export function getRolesByGroup(group: RoleGroup): PartialReadonly<MemberRole>[] {
    if (group.id === RoleId.Administrator) {
        return [{ roleId: group.id }];
    }
    return group.scopes
        .map((scope) =>
            scope.resourcesIds.map((resourceId) => ({
                roleId: group.id,
                scope: { id: scope.id, resourceId },
            }))
        )
        .flat();
}
