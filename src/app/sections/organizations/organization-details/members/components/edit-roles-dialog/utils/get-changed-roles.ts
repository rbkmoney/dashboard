import { MemberRole } from '@dsh/api-codegen/organizations';

import { getAddedRoles } from './get-added-roles';

export function getChangedRoles(oldRoles: MemberRole[], newRoles: MemberRole[]) {
    return {
        added: getAddedRoles(oldRoles, newRoles),
        removed: getAddedRoles(newRoles, oldRoles)
    };
}