import { ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';

import { mockMember } from '../../tests/mock-member';
import { mockMemberRole } from '../../tests/mock-member-role';
import { RoleGroup } from '../types/role-group';
import { getRolesByGroup } from './get-roles-by-group';

describe('getRolesByGroup', () => {
    const expected: RoleGroup[] = [
        {
            id: RoleId.Administrator,
            scopes: [
                {
                    id: ResourceScopeId.Shop,
                    resourcesIds: new Array(8).fill(mockMemberRole.scope.resourceId),
                },
            ],
        },
        {
            id: RoleId.Manager,
            scopes: [
                {
                    id: ResourceScopeId.Shop,
                    resourcesIds: new Array(5).fill(mockMemberRole.scope.resourceId),
                },
            ],
        },
    ];

    it('should convert to roles by group', () => {
        const actual = getRolesByGroup(mockMember.roles);
        expect(actual).toEqual(expected);
    });

    it('should sort', () => {
        const actual = getRolesByGroup(Array.from(mockMember.roles).reverse());
        expect(actual).toEqual(expected);
    });

    it('empty array', () => {
        const actual = getRolesByGroup([]);
        expect(actual).toEqual([]);
    });
});
