import isEqual from 'lodash-es/isEqual';

import { MemberRole } from '@dsh/api-codegen/organizations';

export function hasRole(roles: MemberRole[], role: MemberRole) {
    return roles.findIndex((r) => isEqual(r, role)) !== -1;
}
