import { MemberRole } from '@dsh/api-codegen/organizations';

import { hasRole } from './has-role';

export function getAddedRoles(sourceRoles: MemberRole[], changedRoles: MemberRole[]) {
    return changedRoles.filter((role) => !hasRole(sourceRoles, role));
}